/* eslint-disable react-hooks/purity --
   The 3D scene deliberately uses Math.random() inside useMemo / useRef
   initializers so each mount produces a unique orbit. The randomness is
   stable across re-renders of the same mount (memoized) and the scene is
   visual-only (aria-hidden). Runs under the R3F Canvas frameloop, not
   React's render path. */
"use client";

import { useRef, useMemo, useEffect, useState, type ComponentType } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  SiShopify,
  SiStripe,
  SiWoocommerce,
  SiOdoo,
  SiSalla,
  SiZoho,
  SiWhatsapp,
  SiInstagram,
  SiMessenger,
} from "react-icons/si";
import {
  HiTruck,
  HiCreditCard,
  HiBanknotes,
  HiShoppingBag,
  HiChatBubbleOvalLeftEllipsis,
} from "react-icons/hi2";

type IconCmp = ComponentType<{ className?: string; style?: React.CSSProperties }>;

type ConversationDef = {
  color: string;
  Icon: IconCmp;
  snippet: string;
};

type IntegrationDef = {
  color: string;
  Icon: IconCmp;
  label: string;
};

const CONVERSATION_POOL: ConversationDef[] = [
  { color: "#25D366", Icon: SiWhatsapp, snippet: "Is it available?" },
  { color: "#25D366", Icon: SiWhatsapp, snippet: "كام سعرها؟" },
  { color: "#25D366", Icon: SiWhatsapp, snippet: "Delivery to Giza?" },
  { color: "#25D366", Icon: SiWhatsapp, snippet: "متوفر لسه؟" },
  { color: "#E1306C", Icon: SiInstagram, snippet: "عندكم مقاس M؟" },
  { color: "#E1306C", Icon: SiInstagram, snippet: "Ship to UAE?" },
  { color: "#0084FF", Icon: SiMessenger, snippet: "Order #1248" },
  { color: "#0084FF", Icon: SiMessenger, snippet: "Payment confirmed" },
  { color: "#10B981", Icon: HiChatBubbleOvalLeftEllipsis, snippet: "Web: size guide?" },
];

const INTEGRATION_POOL: IntegrationDef[] = [
  { color: "#95BF47", Icon: SiShopify, label: "Shopify" },
  { color: "#7F54B3", Icon: SiWoocommerce, label: "WooCommerce" },
  { color: "#714B67", Icon: SiOdoo, label: "Odoo" },
  { color: "#BAF3DB", Icon: SiSalla, label: "Salla" },
  { color: "#2BB673", Icon: HiShoppingBag, label: "Youcan" },
  { color: "#E42527", Icon: SiZoho, label: "Zoho" },
  { color: "#F15A22", Icon: HiCreditCard, label: "Paymob" },
  { color: "#FFC107", Icon: HiBanknotes, label: "Fawry" },
  { color: "#635BFF", Icon: SiStripe, label: "Stripe" },
  { color: "#F97316", Icon: HiTruck, label: "Bosta" },
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

function Core() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const logoRef = useRef<HTMLDivElement>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const breathe = 1 + Math.sin(t * 1.1) * 0.045;

    if (coreRef.current) {
      coreRef.current.scale.setScalar(breathe);
      coreRef.current.rotation.y += 0.0028;
      coreRef.current.rotation.x = Math.sin(t * 0.35) * 0.15;
    }
    if (shellRef.current) {
      shellRef.current.scale.setScalar(breathe * 1.18);
      shellRef.current.rotation.y -= 0.0022;
      shellRef.current.rotation.z = Math.cos(t * 0.32) * 0.1;
    }
    if (glowRef.current) {
      const pulse = 0.3 + Math.sin(t * 1.8) * 0.1;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
      glowRef.current.scale.setScalar(breathe);
    }
    if (logoRef.current) {
      const pulse = 0.55 + Math.sin(t * 2.3) * 0.35;
      const s = 1 + Math.sin(t * 2.5) * 0.04;
      logoRef.current.style.filter =
        `drop-shadow(0 0 ${6 + pulse * 10}px rgba(52, 211, 153, ${pulse})) ` +
        `drop-shadow(0 0 ${14 + pulse * 24}px rgba(110, 231, 183, ${pulse * 0.55}))`;
      logoRef.current.style.transform = `scale(${s})`;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#10785C" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshBasicMaterial color="#34D399" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#34D399"
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <Html
        center
        distanceFactor={8}
        zIndexRange={[100, 100]}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={logoRef}
          style={{
            transformOrigin: "center center",
            willChange: "filter, transform",
            width: 88,
            height: 88,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 512 512"
            width="88"
            height="88"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="zaylonCoreLogo"
                x1="0"
                y1="0"
                x2="512"
                y2="512"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#A7F3D0" />
              </linearGradient>
            </defs>
            <g transform="translate(-360, -70) scale(1.2)">
              <path
                fill="url(#zaylonCoreLogo)"
                d="M344.391174,139.540131 C342.814240,136.593918 340.951904,134.191772 340.257355,131.247025 C341.465942,129.070435 343.508911,129.736450 345.209900,129.735870 C446.517761,129.701904 547.825623,129.721359 649.133423,129.638275 C652.607361,129.635422 654.512939,130.835220 656.181152,133.834885 C665.165222,149.990479 674.249695,166.093109 683.561829,182.061050 C685.601746,185.559036 685.367249,187.950134 682.767822,190.896973 C648.393982,229.865997 614.083618,268.890961 579.785583,307.926758 C567.147156,322.311066 554.563660,336.743774 542.008179,351.200562 C540.408264,353.042816 538.845032,354.403076 536.172791,354.395386 C514.178833,354.332184 492.184570,354.371216 470.190430,354.348175 C469.057220,354.346985 467.924377,354.062561 466.641663,353.889862 C466.518646,350.854858 468.674377,349.237488 470.224762,347.468872 C488.012207,327.177948 505.885193,306.962006 523.720215,286.712769 C546.506714,260.841827 569.276978,234.956573 592.059631,209.082230 C598.223145,202.082306 604.425476,195.116333 610.561096,188.092072 C611.595703,186.907654 613.359558,185.709930 612.176331,183.836487 C611.302002,182.452087 609.589600,182.573853 608.064575,182.601883 C559.917053,183.487061 511.765503,182.749908 463.616150,182.950836 C456.286957,182.981430 448.957153,182.811142 441.627441,182.780716 C436.669617,182.760147 435.521729,184.522385 437.888184,188.744019 C442.204132,196.443420 446.637695,204.077042 451.046661,211.723984 C452.258636,213.826019 453.158661,215.624771 451.052734,217.974167 C439.270844,231.118362 427.643524,244.401047 415.934540,257.610870 C415.189423,258.451508 414.200928,259.076416 412.505219,260.481476 C389.731842,220.036911 367.157501,179.945801 344.391174,139.540131 z"
              />
              <path
                fill="url(#zaylonCoreLogo)"
                d="M402.504974,306.514099 C429.299194,276.146271 456.194244,246.328171 482.190460,215.746002 C488.866547,207.892197 495.508484,204.978378 505.520660,205.424072 C522.818726,206.194122 540.176758,205.618622 557.509644,205.607956 C559.481262,205.606750 561.452942,205.607803 563.350647,205.607803 C564.269531,208.771103 562.228760,210.102264 560.890320,211.627518 C529.802246,247.055435 498.679108,282.452545 467.566681,317.859100 C452.174622,335.375549 436.778992,352.888947 421.424683,370.438446 C420.071869,371.984711 417.569366,373.442963 418.805023,375.851715 C419.921997,378.028992 422.615845,377.571045 424.715302,377.559235 C471.708496,377.294678 518.704529,378.127136 565.696533,377.178558 C571.352112,377.064392 577.017029,377.443634 582.678284,377.561127 C585.648438,377.622772 588.622681,377.626038 591.794495,375.872070 C589.908691,369.587738 586.069702,364.494293 583.077576,359.039032 C575.627930,345.456848 575.555298,345.567993 585.863831,334.247131 C593.715210,325.624756 601.400085,316.850891 609.212891,308.193024 C610.753540,306.485718 612.145447,304.556824 615.342163,303.034241 C638.992798,345.053802 662.647095,387.079865 686.266174,429.043335 C683.749023,430.716156 682.033569,430.374847 680.401123,430.385681 C652.240662,430.572571 624.080139,430.807861 595.919250,430.876099 C563.107849,430.955597 530.295898,430.941528 497.484375,430.862549 C456.833618,430.764740 416.183197,430.511047 375.532501,430.475250 C371.605133,430.471802 369.136688,429.447601 367.122345,425.861786 C358.883118,411.194885 350.401459,396.662598 341.863281,382.166565 C340.043121,379.076385 340.363617,376.928406 342.752869,374.239288 C362.670471,351.822113 382.450165,329.282379 402.504974,306.514099 z"
              />
            </g>
          </svg>
        </div>
      </Html>
    </group>
  );
}

type OrbitingNodeProps = {
  def: ConversationDef | IntegrationDef;
  variant: "conversation" | "integration";
  cfg: OrbitConfig;
};

function OrbitingNode({ def, variant, cfg }: OrbitingNodeProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const beamGeomRef = useRef<THREE.BufferGeometry>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);

  const pulse = useRef({
    progress: Math.random(),
    speed: cfg.pulseSpeed,
    delay: cfg.pulseDelay,
    active: false,
  });

  const position = useMemo(() => new THREE.Vector3(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const angle = t * cfg.speed + cfg.phase;

    position.set(
      Math.cos(angle) * cfg.ring,
      Math.sin(angle * 1.2 + cfg.phase) * cfg.ring * cfg.tilt,
      Math.sin(angle) * cfg.ring,
    );

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

  const Icon = def.Icon;
  const isConv = variant === "conversation";

  const labelBg = "rgba(15, 25, 23, 0.92)";
  const labelBorder = "rgba(45, 106, 94, 0.4)";
  const labelText = "#E5E7EB";

  return (
    <>
      <line>
        <bufferGeometry ref={beamGeomRef}>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(6), 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={isConv ? def.color : "#34D399"}
          transparent
          opacity={isConv ? 0.3 : 0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>
      <group ref={groupRef}>
        <mesh ref={pulseRef}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial
            color={isConv ? "#FFFFFF" : def.color}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <Html center distanceFactor={10} zIndexRange={[0, 0]} style={{ pointerEvents: "none" }}>
          {isConv ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 8px 4px 6px",
                borderRadius: 9999,
                background: labelBg,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${labelBorder}`,
                whiteSpace: "nowrap",
                boxShadow: `0 2px 10px ${def.color}33`,
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: `${def.color}33`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon style={{ width: 8, height: 8, color: def.color }} />
              </span>
              <span
                style={{
                  fontSize: 10,
                  lineHeight: 1,
                  fontWeight: 500,
                  color: labelText,
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                }}
              >
                {(def as ConversationDef).snippet}
              </span>
            </div>
          ) : (
            <div
              title={(def as IntegrationDef).label}
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: labelBg,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${labelBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 2px 10px ${def.color}33`,
              }}
            >
              <Icon style={{ width: 13, height: 13, color: def.color }} />
            </div>
          )}
        </Html>
      </group>
    </>
  );
}

function Filaments() {
  const linesRef = useRef<THREE.LineSegments>(null!);
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
    const t = state.clock.elapsedTime;
    if (linesRef.current) {
      linesRef.current.rotation.y = -t * 0.04;
      linesRef.current.rotation.z = Math.cos(t * 0.28) * 0.08;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#34D399"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function ParticleCloud({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

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
    const t = state.clock.elapsedTime;
    if (pointsRef.current) pointsRef.current.rotation.y = t * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color="#6EE7B7"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

type ZaylonBrainOrbProps = {
  className?: string;
};

export default function ZaylonBrainOrb({ className = "" }: ZaylonBrainOrbProps) {
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches,
  );

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

  const { conversations, integrations, convOrbits, intOrbits } = useMemo(() => {
    const convCount = isMobile ? 2 : 3;
    const intCount = isMobile ? 3 : 4;
    const conversations = shuffle(CONVERSATION_POOL).slice(0, convCount);
    const integrations = shuffle(INTEGRATION_POOL).slice(0, intCount);
    const convOrbits = makeOrbitConfigs(convCount, 1.85, 2.2);
    const intOrbits = makeOrbitConfigs(intCount, 2.85, 3.15);
    return { conversations, integrations, convOrbits, intOrbits };
  }, [isMobile]);

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 48 }}
        dpr={[1, isMobile ? 1.5 : 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Core />
        <Filaments />
        {conversations.map((def, i) => (
          <OrbitingNode
            key={`conv-${i}`}
            def={def}
            variant="conversation"
            cfg={convOrbits[i]}
          />
        ))}
        {integrations.map((def, i) => (
          <OrbitingNode
            key={`int-${i}`}
            def={def}
            variant="integration"
            cfg={intOrbits[i]}
          />
        ))}
        <ParticleCloud count={isMobile ? 250 : 400} />
      </Canvas>
    </div>
  );
}
