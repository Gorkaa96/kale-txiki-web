import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kale Txiki Taberna | Restaurante en Lakuntza, Navarra",
  description: "Web de Kale Txiki Taberna en Lakuntza, Navarra.",
};

export default function RootLayout(props: { children: any }) {
  return (
    <html lang="es">
      <body>{props.children}</body>
    </html>
  );
}
