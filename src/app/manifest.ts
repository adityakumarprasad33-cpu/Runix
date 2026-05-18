import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RUNIX | Advanced AI Infrastructure",
    short_name: "RUNIX",
    description:
      "Futuristic AI ecosystem company focused on adaptive runtime infrastructure, AI employees, and autonomous workflows.",
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#06b6d4",
    icons: [
      { src: "/runix.png", sizes: "192x192", type: "image/png" },
      { src: "/runix.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
