import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./kale-v2.css";
import "./kale-polish.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kale-txiki-web.vercel.app"),
  title: {
    default: "Kale Txiki Taberna | Bar y restaurante en Lakuntza",
    template: "%s | Kale Txiki Taberna",
  },
  description: "Bar y restaurante en Lakuntza para menú diario, fin de semana, pintxos, vermut, raciones, pizzas y hamburguesas.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Kale Txiki Taberna | Bar y restaurante en Lakuntza",
    description: "Menú diario, barra, vermut, raciones, pizzas y hamburguesas en un local moderno y cercano en Lakuntza.",
    url: "https://kale-txiki-web.vercel.app",
    siteName: "Kale Txiki Taberna",
    images: [{ url: "/assets/hero-local.webp", width: 1200, height: 630, alt: "Kale Txiki Taberna" }],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
