import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdelrahman Abouroumia - AI Engineer Portfolio",
    short_name: "Romia",
    description:
      "Portfolio of Abdelrahman Abouroumia (Romia), AI Engineer and Co-Founder of Zaylon AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#09090B",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
