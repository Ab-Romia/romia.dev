/* eslint-disable react-hooks/purity --
   This 3D scene deliberately uses Math.random() inside useMemo / useRef
   initializers so each mount produces a unique orbit. The randomness is
   stable across re-renders of the same mount (memoized) and the scene is
   visual-only (aria-hidden). Runs under the R3F Canvas frameloop, not
   React's render path. */
"use client";

import { useRef, useMemo, useEffect, useState, type ComponentType } from "react";
// useThree lets OrbInvalidator request renders so the orb always paints, even
// when the frameloop is suspended off-screen.
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMotionValue, type MotionValue } from "motion/react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { SiWhatsapp, SiInstagram, SiMessenger } from "react-icons/si";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

/**
 * Meaning:
 *   - Zaylon's AI core at the centre (the Z mark, painted INSIDE the orb).
 *   - Inner orbit: live customer conversations streaming INTO the brain.
 *   - Outer orbit: commerce integrations receiving work FROM the brain.
 *   - On every visit the orbit contents are resampled from a pool,
 *     so no two views look the same.
 *
 * Ported from the Zaylon.AI marketing orb so romia.dev and zaylon.ai share the
 * exact same brain: theme-aware palette, the Z mark as a 3D texture at the
 * core, screen-facing elliptical orbits that never cross the logo, real brand
 * logos on the integration pills, and a dim->full power wake. Here the orb is
 * mounted at constant full power, so it reads as a complete, ambiently alive
 * brain (reduced motion freezes it fully drawn).
 */

export type OrbTheme = "dark" | "light";

/**
 * Theme-aware material palette. In DARK mode every luminous element uses
 * AdditiveBlending (light piling onto darkness, which is what makes the orb
 * glow). On a near-white LIGHT page additive blending is mathematically
 * invisible (white + light = white), so light mode gets its OWN palette:
 * NormalBlending with deeper, denser emeralds so the wireframe + particles read
 * as crisp emerald line-art on warm-white. Dark values are the originals.
 */
type OrbPalette = {
  blending: THREE.Blending;
  core: string; coreDim: number; coreFull: number;
  shell: string; shellDim: number; shellFull: number;
  glow: string; glowFull: number; glowBlending: THREE.Blending;
  filament: string; filamentDim: number; filamentFull: number;
  particle: string; particleSize: number; particleDim: number; particleFull: number;
  beamConv: number; beamInt: number; beamIntColor: string;
  /** Conversation pulse colour. White reads on dark (additive) but is invisible
   *  on white; light mode pulses ride the channel's own brand colour. */
  pulseConvColor: string | null;
  /** Z-core logo gradient stops. */
  logoStop0: string; logoStop1: string;
  /** Conversation pill chrome (DOM, so theme-driven inline styles). */
  pillBg: string; pillBorder: string; pillText: string;
};

const ORB_PALETTES: Record<OrbTheme, OrbPalette> = {
  dark: {
    blending: THREE.AdditiveBlending,
    // `*Dim` is the RESTING value (power 0): the orb must read as a complete
    // glowing sphere the instant it's on screen. `*Full` is the powered peak.
    core: "#10785C", coreDim: 0.34, coreFull: 0.5,
    shell: "#34D399", shellDim: 0.11, shellFull: 0.18,
    glow: "#34D399", glowFull: 0.3, glowBlending: THREE.AdditiveBlending,
    filament: "#34D399", filamentDim: 0.1, filamentFull: 0.15,
    particle: "#6EE7B7", particleSize: 0.026, particleDim: 0.34, particleFull: 0.6,
    beamConv: 0.3, beamInt: 0.2, beamIntColor: "#34D399",
    pulseConvColor: "#FFFFFF",
    logoStop0: "#34D399", logoStop1: "#A7F3D0",
    pillBg: "rgba(15, 25, 23, 0.9)", pillBorder: "rgba(45, 106, 94, 0.3)", pillText: "#E5E7EB",
  },
  light: {
    blending: THREE.NormalBlending,
    core: "#065F46", coreDim: 0.48, coreFull: 0.78,
    shell: "#0B7A5B", shellDim: 0.2, shellFull: 0.34,
    glow: "#34D399", glowFull: 0.1, glowBlending: THREE.NormalBlending,
    filament: "#0B7A5B", filamentDim: 0.22, filamentFull: 0.36,
    particle: "#059669", particleSize: 0.03, particleDim: 0.4, particleFull: 0.55,
    beamConv: 0.42, beamInt: 0.32, beamIntColor: "#0B7A5B",
    pulseConvColor: null,
    logoStop0: "#0B7A5B", logoStop1: "#34D399",
    pillBg: "rgba(255, 255, 255, 0.92)", pillBorder: "rgba(6, 95, 70, 0.22)", pillText: "#064E3B",
  },
};

type IconCmp = ComponentType<{ className?: string; style?: React.CSSProperties }>;

type ConversationDef = {
  color: string;
  Icon: IconCmp;
  snippet: string;
};

/** Outer-orbit pill for a commerce integration: a real brand logo from
 *  /public/logos. `color` keeps the beam + halo tints brand-specific. */
type IntegrationDef = {
  color: string;
  imgSrc: string;
  label: string;
};

function isConversation(def: ConversationDef | IntegrationDef): def is ConversationDef {
  return (def as ConversationDef).snippet !== undefined;
}

function isIntegration(def: ConversationDef | IntegrationDef): def is IntegrationDef {
  return (def as IntegrationDef).imgSrc !== undefined;
}

const CONVERSATION_POOL: ConversationDef[] = [
  { color: "#25D366", Icon: SiWhatsapp, snippet: "Is it available?" },
  { color: "#25D366", Icon: SiWhatsapp, snippet: "Delivery to Giza?" },
  { color: "#25D366", Icon: SiWhatsapp, snippet: "Can I order 2?" },
  { color: "#25D366", Icon: SiWhatsapp, snippet: "How much is it?" },
  { color: "#E1306C", Icon: SiInstagram, snippet: "Lovely, price?" },
  { color: "#E1306C", Icon: SiInstagram, snippet: "Ship to UAE?" },
  { color: "#E1306C", Icon: SiInstagram, snippet: "Matching set?" },
  { color: "#E1306C", Icon: SiInstagram, snippet: "Got size M?" },
  { color: "#0084FF", Icon: SiMessenger, snippet: "Order #1248" },
  { color: "#0084FF", Icon: SiMessenger, snippet: "Track my order" },
  { color: "#0084FF", Icon: SiMessenger, snippet: "Payment confirmed" },
  { color: "#0084FF", Icon: SiMessenger, snippet: "Where is my package?" },
  { color: "#10B981", Icon: HiChatBubbleOvalLeftEllipsis, snippet: "Web chat: size guide?" },
  { color: "#10B981", Icon: HiChatBubbleOvalLeftEllipsis, snippet: "Web chat: I want to order" },
];

const INTEGRATION_POOL: IntegrationDef[] = [
  // E-commerce platforms
  { color: "#95BF47", imgSrc: "/logos/shopify.svg", label: "Shopify" },
  { color: "#7F54B3", imgSrc: "/logos/woocommerce.svg", label: "WooCommerce" },
  { color: "#714B67", imgSrc: "/logos/odoo.svg", label: "Odoo" },
  { color: "#BAF3DB", imgSrc: "/logos/salla.svg", label: "Salla" },
  { color: "#2BB673", imgSrc: "/logos/youcan.svg", label: "YouCan" },
  { color: "#E42527", imgSrc: "/logos/zoho.svg", label: "Zoho" },
  // Payments
  { color: "#E94137", imgSrc: "/logos/paymob.png", label: "Paymob" },
  { color: "#FBBF13", imgSrc: "/logos/fawry.png", label: "Fawry" },
  { color: "#635BFF", imgSrc: "/logos/stripe.svg", label: "Stripe" },
  // Shipping
  { color: "#E91D52", imgSrc: "/logos/bosta.png", label: "Bosta" },
  { color: "#DA0F2C", imgSrc: "/logos/aramex.svg", label: "Aramex" },
  { color: "#2563EB", imgSrc: "/logos/shipblu.svg", label: "ShipBlu" },
];

function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type OrbitConfig = {
  ring: number;
  tilt: number;
  speed: number;
  phase: number;
  pulseSpeed: number;
  pulseDelay: number;
};

function makeOrbitConfigs(count: number, ringMin: number, ringMax: number): OrbitConfig[] {
  const step = (Math.PI * 2) / count;
  const dir = Math.random() < 0.5 ? 1 : -1;
  return Array.from({ length: count }, (_, i) => ({
    ring: ringMin + Math.random() * (ringMax - ringMin),
    tilt: (Math.random() * 0.6 - 0.3) * (Math.random() < 0.5 ? 1 : -1),
    speed: dir * (0.18 + Math.random() * 0.18),
    phase: i * step + Math.random() * 0.6,
    pulseSpeed: 0.5 + Math.random() * 0.4,
    pulseDelay: Math.random() * 2.5,
  }));
}

/* ── Power-up wiring ───────────────────────────────────────────────
   `power` is a 0->1 MotionValue read per-frame inside useFrame and mapped onto
   a dim->full range for each channel. Reading it in the frame loop (not via
   React state) keeps the wake off the render path. When `full` is set (reduced
   motion) the orb pins to the static fully-drawn end-state. */
const lerp = (from: number, to: number, p: number) => from + (to - from) * p;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

/* ── The Zaylon Z, as a texture for the orb CORE ──────────────────────
   The Z is a textured plane in the 3D scene at the centre: the front of the
   wireframe sphere has smaller depth, so its lines render OVER the Z while the
   back of the sphere sits behind it. The mark reads as the luminous core within
   the orb, not a flat DOM sticker on top. These are the two glyph paths. */
const Z_PATH_1 =
  "M344.391174,139.540131 C342.814240,136.593918 340.951904,134.191772 340.257355,131.247025 C341.465942,129.070435 343.508911,129.736450 345.209900,129.735870 C446.517761,129.701904 547.825623,129.721359 649.133423,129.638275 C652.607361,129.635422 654.512939,130.835220 656.181152,133.834885 C665.165222,149.990479 674.249695,166.093109 683.561829,182.061050 C685.601746,185.559036 685.367249,187.950134 682.767822,190.896973 C648.393982,229.865997 614.083618,268.890961 579.785583,307.926758 C567.147156,322.311066 554.563660,336.743774 542.008179,351.200562 C540.408264,353.042816 538.845032,354.403076 536.172791,354.395386 C514.178833,354.332184 492.184570,354.371216 470.190430,354.348175 C469.057220,354.346985 467.924377,354.062561 466.641663,353.889862 C466.518646,350.854858 468.674377,349.237488 470.224762,347.468872 C488.012207,327.177948 505.885193,306.962006 523.720215,286.712769 C546.506714,260.841827 569.276978,234.956573 592.059631,209.082230 C598.223145,202.082306 604.425476,195.116333 610.561096,188.092072 C611.595703,186.907654 613.359558,185.709930 612.176331,183.836487 C611.302002,182.452087 609.589600,182.573853 608.064575,182.601883 C559.917053,183.487061 511.765503,182.749908 463.616150,182.950836 C456.286957,182.981430 448.957153,182.811142 441.627441,182.780716 C436.669617,182.760147 435.521729,184.522385 437.888184,188.744019 C442.204132,196.443420 446.637695,204.077042 451.046661,211.723984 C452.258636,213.826019 453.158661,215.624771 451.052734,217.974167 C439.270844,231.118362 427.643524,244.401047 415.934540,257.610870 C415.189423,258.451508 414.200928,259.076416 412.505219,260.481476 C389.731842,220.036911 367.157501,179.945801 344.391174,139.540131 z";
const Z_PATH_2 =
  "M402.504974,306.514099 C429.299194,276.146271 456.194244,246.328171 482.190460,215.746002 C488.866547,207.892197 495.508484,204.978378 505.520660,205.424072 C522.818726,206.194122 540.176758,205.618622 557.509644,205.607956 C559.481262,205.606750 561.452942,205.607803 563.350647,205.607803 C564.269531,208.771103 562.228760,210.102264 560.890320,211.627518 C529.802246,247.055435 498.679108,282.452545 467.566681,317.859100 C452.174622,335.375549 436.778992,352.888947 421.424683,370.438446 C420.071869,371.984711 417.569366,373.442963 418.805023,375.851715 C419.921997,378.028992 422.615845,377.571045 424.715302,377.559235 C471.708496,377.294678 518.704529,378.127136 565.696533,377.178558 C571.352112,377.064392 577.017029,377.443634 582.678284,377.561127 C585.648438,377.622772 588.622681,377.626038 591.794495,375.872070 C589.908691,369.587738 586.069702,364.494293 583.077576,359.039032 C575.627930,345.456848 575.555298,345.567993 585.863831,334.247131 C593.715210,325.624756 601.400085,316.850891 609.212891,308.193024 C610.753540,306.485718 612.145447,304.556824 615.342163,303.034241 C638.992798,345.053802 662.647095,387.079865 686.266174,429.043335 C683.749023,430.716156 682.033569,430.374847 680.401123,430.385681 C652.240662,430.572571 624.080139,430.807861 595.919250,430.876099 C563.107849,430.955597 530.295898,430.941528 497.484375,430.862549 C456.833618,430.764740 416.183197,430.511047 375.532501,430.475250 C371.605133,430.471802 369.136688,429.447601 367.122345,425.861786 C358.883118,411.194885 350.401459,396.662598 341.863281,382.166565 C340.043121,379.076385 340.363617,376.928406 342.752869,374.239288 C362.670471,351.822113 382.450165,329.282379 402.504974,306.514099 z";

/** Build the Z mark as an SVG data URI with the theme's emerald gradient. */
function zSvgDataUri(stop0: string, stop1: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1024" height="1024">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0%" stop-color="${stop0}"/><stop offset="100%" stop-color="${stop1}"/>` +
    `</linearGradient></defs>` +
    `<g transform="translate(-360,-70) scale(1.2)">` +
    `<path fill="url(#g)" d="${Z_PATH_1}"/><path fill="url(#g)" d="${Z_PATH_2}"/></g></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/** Kept for backward-compat: the Z mark as a plain DOM SVG. The orb now paints
 *  the Z as a 3D texture (see Core), but this export is preserved in case it is
 *  referenced elsewhere. */
export function ZaylonCoreLogo({ size = 88 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="zaylonCoreLogo" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
      </defs>
      <g transform="translate(-360, -70) scale(1.2)">
        <path fill="url(#zaylonCoreLogo)" d={Z_PATH_1} />
        <path fill="url(#zaylonCoreLogo)" d={Z_PATH_2} />
      </g>
    </svg>
  );
}

function Core({ power, full, pal }: { power: MotionValue<number>; full: boolean; pal: OrbPalette }) {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  // The Z mark as a texture at the orb centre, loaded imperatively (not via
  // Suspense) so the rest of the orb NEVER waits on it: the sphere + particles
  // paint immediately and the Z fades in a frame later. Rebuilt when the
  // theme's emerald gradient changes.
  const [zTex, setZTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(zSvgDataUri(pal.logoStop0, pal.logoStop1), (tex) => {
      if (cancelled) {
        tex.dispose();
        return;
      }
      tex.colorSpace = THREE.SRGBColorSpace;
      // Sharp sampling: no mipmaps, linear mag/min, anisotropy. Keeps the Z
      // crisp instead of fuzzy.
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = 8;
      setZTex((prev) => {
        if (prev) prev.dispose();
        return tex;
      });
    });
    return () => {
      cancelled = true;
    };
  }, [pal.logoStop0, pal.logoStop1]);

  useFrame((state) => {
    // Reduced motion / static: the JSX already seeds the full end-state. Render
    // the frame, but advance NOTHING: no breathe, no rotation, no halo pulse.
    if (full) return;
    const t = state.clock.elapsedTime;
    const breathe = 1 + Math.sin(t * 1.1) * 0.045;
    const p = power.get();
    // The core rests near full size (0.92) so the orb always reads as a complete
    // brain; the wake adds a gentle final settle to full.
    const wake = lerp(0.92, 1, easeOutCubic(p));

    if (groupRef.current) groupRef.current.scale.setScalar(wake);
    if (coreRef.current) {
      coreRef.current.scale.setScalar(breathe);
      coreRef.current.rotation.y += 0.0028;
      coreRef.current.rotation.x = Math.sin(t * 0.35) * 0.15;
      (coreRef.current.material as THREE.MeshBasicMaterial).opacity = lerp(pal.coreDim, pal.coreFull, p);
    }
    if (shellRef.current) {
      shellRef.current.scale.setScalar(breathe * 1.18);
      shellRef.current.rotation.y -= 0.0022;
      shellRef.current.rotation.z = Math.cos(t * 0.32) * 0.1;
      (shellRef.current.material as THREE.MeshBasicMaterial).opacity = lerp(pal.shellDim, pal.shellFull, p);
    }
    if (glowRef.current) {
      const pulse = 0.3 + Math.sin(t * 1.8) * 0.1;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * lerp(pal.glowFull, pal.glowFull * 3.33, p);
      glowRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={groupRef} scale={full ? 1 : 0.92}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={pal.core} wireframe transparent opacity={full ? pal.coreFull : pal.coreDim} />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshBasicMaterial color={pal.shell} wireframe transparent opacity={full ? pal.shellFull : pal.shellDim} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color={pal.glow}
          transparent
          opacity={full ? pal.glowFull : pal.glowFull * 0.3}
          depthWrite={false}
          blending={pal.glowBlending}
        />
      </mesh>
      {/* The Z mark, INSIDE the orb: a textured plane at z≈0 so the front half
          of the wireframe sphere renders OVER it. depthWrite off so it never
          blocks particles/beams; renderOrder keeps it after the wireframe.
          Only mounts once the texture has loaded; the orb paints without it. */}
      {zTex && (
        <mesh position={[0, 0, 0.02]} renderOrder={1}>
          <planeGeometry args={[1.45, 1.45]} />
          <meshBasicMaterial map={zTex} transparent depthWrite={false} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

type OrbitingNodeProps = {
  def: ConversationDef | IntegrationDef;
  variant: "conversation" | "integration";
  cfg: OrbitConfig;
  power: MotionValue<number>;
  pal: OrbPalette;
  full: boolean;
};

function OrbitingNode({ def, variant, cfg, power, pal, full }: OrbitingNodeProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const beamGeomRef = useRef<THREE.BufferGeometry>(null!);
  const beamMatRef = useRef<THREE.LineBasicMaterial>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);
  // The drei <Html> pill wrapper, faded in via inline opacity during assembly.
  const pillRef = useRef<HTMLDivElement>(null!);

  const pulse = useRef({
    progress: Math.random(),
    speed: cfg.pulseSpeed,
    delay: cfg.pulseDelay,
    active: false,
  });

  // Integrated orbit angle, advanced by `delta * speed * wake` so the wake can
  // scale orbit speed without the position discontinuity a `t * speed` formula
  // would create the instant `power` changes.
  const angleRef = useRef(cfg.phase);
  const position = useMemo(() => new THREE.Vector3(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  // Static end-state position (reduced motion): seed the node on its ring so the
  // static orb is a proper assembled constellation rather than a pile at centre.
  const staticPos = useMemo<[number, number, number]>(() => {
    const a = cfg.phase;
    return [
      Math.cos(a) * cfg.ring,
      Math.sin(a) * cfg.ring * 0.62,
      Math.sin(a * 2 + cfg.phase) * 0.5 + cfg.tilt,
    ];
  }, [cfg]);

  useFrame((_state, delta) => {
    if (full) return;
    const pw = power.get();
    const asm = easeOutCubic(pw);
    const speedFactor = lerp(0.12, 1, pw);
    angleRef.current += delta * cfg.speed * speedFactor;
    const angle = angleRef.current;

    // ASSEMBLY: nodes start at 1.6× their orbit radius and converge as power
    // arrives. A SCREEN-FACING elliptical halo (x wide, y flatter) with a gentle
    // depth wobble keeps the pills circling AROUND the orb, never across its
    // centre, so the Z mark stays clear.
    const ringMul = lerp(1.6, 1, asm);
    const R = cfg.ring * ringMul;
    position.set(
      Math.cos(angle) * R,
      Math.sin(angle) * R * 0.62,
      Math.sin(angle * 2 + cfg.phase) * 0.5 + cfg.tilt,
    );

    if (pillRef.current) pillRef.current.style.opacity = `${clamp01((pw - 0.15) / 0.55)}`;
    if (beamMatRef.current) {
      const baseBeam = variant === "conversation" ? pal.beamConv : pal.beamInt;
      beamMatRef.current.opacity = baseBeam * asm;
    }

    if (groupRef.current) groupRef.current.position.copy(position);

    if (beamGeomRef.current) {
      const arr = beamGeomRef.current.attributes.position.array as Float32Array;
      arr[0] = 0; arr[1] = 0; arr[2] = 0;
      arr[3] = position.x; arr[4] = position.y; arr[5] = position.z;
      beamGeomRef.current.attributes.position.needsUpdate = true;
    }

    const ps = pulse.current;
    if (ps.delay > 0) {
      ps.delay -= delta;
      ps.active = false;
    } else {
      ps.active = true;
      ps.progress += delta * ps.speed;
      if (ps.progress >= 1) {
        ps.progress = 0;
        ps.speed = 0.5 + Math.random() * 0.4;
        ps.delay = 0.5 + Math.random() * 2.2;
        ps.active = false;
      }
    }

    if (pulseRef.current) {
      const travel = variant === "conversation" ? 1 - ps.progress : ps.progress;
      tmp.copy(position).multiplyScalar(travel);
      pulseRef.current.position.copy(tmp).sub(position);
      const envelope = ps.active ? 1 - Math.abs(ps.progress - 0.5) * 2 : 0;
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = envelope * 0.85;
      pulseRef.current.scale.setScalar(0.06 + ps.progress * 0.04);
    }
  });

  const ConvIcon = isConversation(def) ? def.Icon : null;
  const intImgSrc = isIntegration(def) ? def.imgSrc : null;
  const isConv = variant === "conversation";

  return (
    <>
      <line>
        <bufferGeometry ref={beamGeomRef}>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(6), 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={beamMatRef}
          color={isConv ? def.color : pal.beamIntColor}
          transparent
          opacity={full ? (isConv ? pal.beamConv : pal.beamInt) : 0}
          blending={pal.blending}
          depthWrite={false}
        />
      </line>
      <group ref={groupRef} position={full ? staticPos : undefined}>
        <mesh ref={pulseRef}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial
            color={isConv ? (pal.pulseConvColor ?? def.color) : def.color}
            transparent
            opacity={0}
            blending={pal.blending}
            depthWrite={false}
          />
        </mesh>
        <Html center distanceFactor={10} style={{ pointerEvents: "none" }}>
          {isConv ? (
            <div
              ref={pillRef}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 8px 4px 6px",
                borderRadius: 9999,
                background: pal.pillBg,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${pal.pillBorder}`,
                whiteSpace: "nowrap",
                boxShadow: `0 2px 10px ${def.color}22`,
                opacity: full ? 1 : 0,
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: `${def.color}22`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {ConvIcon ? <ConvIcon style={{ width: 8, height: 8, color: def.color }} /> : null}
              </span>
              <span
                style={{
                  fontSize: 9.5,
                  lineHeight: 1,
                  fontWeight: 500,
                  color: pal.pillText,
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {(def as ConversationDef).snippet}
              </span>
            </div>
          ) : (
            <div
              ref={pillRef}
              title={(def as IntegrationDef).label}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: 3,
                boxShadow: `0 2px 10px ${def.color}55`,
                opacity: full ? 1 : 0,
              }}
            >
              {intImgSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={intImgSrc}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : null}
            </div>
          )}
        </Html>
      </group>
    </>
  );
}

function Filaments({ power, full, pal }: { power: MotionValue<number>; full: boolean; pal: OrbPalette }) {
  const linesRef = useRef<THREE.LineSegments>(null!);
  const matRef = useRef<THREE.LineBasicMaterial>(null!);
  const COUNT = 10;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 6);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const inner = 0.55;
      const outer = 1.6 + Math.random() * 0.6;
      const dx = Math.sin(phi) * Math.cos(theta);
      const dy = Math.sin(phi) * Math.sin(theta);
      const dz = Math.cos(phi);
      arr[i * 6] = dx * inner;
      arr[i * 6 + 1] = dy * inner;
      arr[i * 6 + 2] = dz * inner;
      arr[i * 6 + 3] = dx * outer;
      arr[i * 6 + 4] = dy * outer;
      arr[i * 6 + 5] = dz * outer;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (full) return;
    const t = state.clock.elapsedTime;
    if (linesRef.current) {
      linesRef.current.rotation.y = -t * 0.04;
      linesRef.current.rotation.z = Math.cos(t * 0.28) * 0.08;
    }
    if (matRef.current) matRef.current.opacity = lerp(pal.filamentDim, pal.filamentFull, power.get());
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={matRef}
        color={pal.filament}
        transparent
        opacity={full ? pal.filamentFull : pal.filamentDim}
        blending={pal.blending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function ParticleCloud({ count, power, full, pal }: { count: number; power: MotionValue<number>; full: boolean; pal: OrbPalette }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const matRef = useRef<THREE.PointsMaterial>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.4 + Math.pow(Math.random(), 2) * 2.8;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (full) return;
    const t = state.clock.elapsedTime;
    if (pointsRef.current) pointsRef.current.rotation.y = t * 0.04;
    if (matRef.current) matRef.current.opacity = lerp(pal.particleDim, pal.particleFull, power.get());
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={pal.particleSize}
        color={pal.particle}
        transparent
        opacity={full ? pal.particleFull : pal.particleDim}
        sizeAttenuation
        blending={pal.blending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Render guarantee ──────────────────────────────────────────────
   When the frameloop is 'never' (off-screen) R3F only paints on demand. A short
   warm-up burst after mount paints the resting orb once GL + async logo images
   are ready, and every power change requests a frame so the assembly paints. */
function OrbInvalidator({ power }: { power: MotionValue<number> }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const timers = [0, 120, 300, 600, 1200].map((ms) => window.setTimeout(() => invalidate(), ms));
    const unsub = power.on("change", () => invalidate());
    return () => {
      timers.forEach(clearTimeout);
      unsub();
    };
  }, [invalidate, power]);
  return null;
}

type ZaylonBrainOrbProps = {
  className?: string;
};

export default function ZaylonBrainOrb({ className = "" }: ZaylonBrainOrbProps) {
  // Resolve the page theme (next-themes). Undefined during hydration -> dark.
  const { resolvedTheme } = useTheme();
  const theme: OrbTheme = resolvedTheme === "light" ? "light" : "dark";
  const pal = ORB_PALETTES[theme];

  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches,
  );
  const [isInView, setIsInView] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqlMobile = window.matchMedia("(max-width: 640px)");
    const onRM = () => setReducedMotion(mql.matches);
    const onMob = () => setIsMobile(mqlMobile.matches);
    mql.addEventListener("change", onRM);
    mqlMobile.addEventListener("change", onMob);
    return () => {
      mql.removeEventListener("change", onRM);
      mqlMobile.removeEventListener("change", onMob);
    };
  }, []);

  // Suspend the WebGL frameloop when the orb scrolls out of view, so the page
  // below it scrolls without paying the orb's frame budget.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setIsInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0, rootMargin: "200px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Resample orbit contents once per mount, kept sparse so the scene stays clean.
  const { conversations, integrations, convOrbits, intOrbits } = useMemo(() => {
    const convCount = isMobile ? 2 : 3;
    const intCount = isMobile ? 3 : 4;
    const conversations = shuffle(CONVERSATION_POOL).slice(0, convCount);
    const integrations = shuffle(INTEGRATION_POOL).slice(0, intCount);
    const convOrbits = makeOrbitConfigs(convCount, 1.85, 2.2);
    const intOrbits = makeOrbitConfigs(intCount, 2.85, 3.15);
    return { conversations, integrations, convOrbits, intOrbits };
  }, [isMobile]);

  // Constant full power: the orb is always present + ambiently alive (matching
  // zaylon.ai's BrainSection, which mounts it at constant power). Reduced motion
  // freezes the scene fully drawn (`full`), so useFrame advances nothing.
  const fullPower = useMotionValue(1);
  const staticFull = reducedMotion;

  return (
    // Force LTR so drei <Html center> absolute positioning (left/top: 50%) is
    // computed against a stable inline axis regardless of document direction.
    <div
      ref={wrapperRef}
      aria-hidden="true"
      dir="ltr"
      className={className}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 48 }}
        dpr={[1, isMobile ? 1.5 : 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={!isInView ? "never" : "always"}
      >
        <OrbInvalidator power={fullPower} />
        <Core power={fullPower} full={staticFull} pal={pal} />
        <Filaments power={fullPower} full={staticFull} pal={pal} />
        {conversations.map((def, i) => (
          <OrbitingNode
            key={`conv-${i}`}
            def={def}
            variant="conversation"
            cfg={convOrbits[i]}
            power={fullPower}
            pal={pal}
            full={staticFull}
          />
        ))}
        {integrations.map((def, i) => (
          <OrbitingNode
            key={`int-${i}`}
            def={def}
            variant="integration"
            cfg={intOrbits[i]}
            power={fullPower}
            pal={pal}
            full={staticFull}
          />
        ))}
        <ParticleCloud count={isMobile ? 150 : 280} power={fullPower} full={staticFull} pal={pal} />
      </Canvas>
    </div>
  );
}
