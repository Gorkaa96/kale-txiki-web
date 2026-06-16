import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kale-txiki-web.vercel.app"),
  title: {
    default: "Kale Txiki Taberna | Restaurante en Lakuntza",
    template: "%s | Kale Txiki Taberna",
  },
  description: "Menú del día, menú de fin de semana, pintxos, vermuts, raciones, pizzas y hamburguesas caseras en Lakuntza.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Kale Txiki Taberna | Restaurante en Lakuntza",
    description: "Taberna restaurante en Lakuntza con menú, barra, vermut, raciones, pizzas y hamburguesas caseras.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
