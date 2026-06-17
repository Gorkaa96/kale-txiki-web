import SimpleShell from "../simple-shell";

export const metadata = {
  title: "Galería",
  description: "Ambiente e interior de Kale Txiki Taberna en Lakuntza.",
};

export default function Page() {
  return <SimpleShell kicker="Galería" title="Un local actual para comer, cenar y tomar algo." image><p>La estética de Kale Txiki combina barra negra, madera clara, tonos piedra y una luz cálida que invita a quedarse.</p><div className="galleryGrid"><div aria-label="Barra de Kale Txiki" /><div aria-label="Interior de Kale Txiki" /><div aria-label="Comedor de Kale Txiki" /></div></SimpleShell>;
}
