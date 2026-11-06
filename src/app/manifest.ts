import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdelrahman Abouroumia - AI & Backend Engineer Portfolio",
    short_name: "Romia",
    description:
      "Portfolio of Abdelrahman Abouroumia (Romia), AI & Backend Engineer. Software Engineer at Tutanic and Co-Founder of Zaylon AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0B0D",
    theme_color: "#0A0B0D",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
