import type { MetadataRoute } from "next";

const baseUrl = "https://kale-txiki-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menu", "/reservas", "/contacto", "/galeria", "/aviso-legal", "/politica-privacidad", "/politica-cookies"];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/reservas" || route === "/contacto" ? 0.8 : 0.6,
  }));
}
