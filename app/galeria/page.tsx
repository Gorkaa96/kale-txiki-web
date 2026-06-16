export const metadata = {
  title: "Galería",
  description: "Ambiente e interior de Kale Txiki Taberna en Lakuntza.",
};

export default function Page() {
  return <main className="simplePage"><a href="/" className="simpleLogo"><img src="/logo.png" alt="Kale Txiki" /></a><section><p className="kicker">Galería</p><h1>Un local actual para comer, cenar y tomar algo.</h1><p>La estética de Kale Txiki combina barra negra, madera clara, tonos piedra y una luz cálida que invita a quedarse.</p><div className="galleryGrid"><div aria-label="Barra de Kale Txiki" /><div aria-label="Interior de Kale Txiki" /><div aria-label="Comedor de Kale Txiki" /></div></section></main>;
}
