import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kale Txiki Taberna",
    short_name: "Kale Txiki",
    start_url: "/",
    display: "standalone",
    background_color: "#e7e1d8",
    theme_color: "#11100f",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
