import { site } from "../../lib/site";

export const metadata = {
  title: "Menús y carta",
  description: "Menú del día, menú de fin de semana, pintxos, raciones, pizzas y hamburguesas en Kale Txiki Taberna.",
};

const items = ["Menú entre semana", "Menú de fin de semana", "Pintxos y vermuts", "Raciones", "Pizzas", "Hamburguesas caseras"];

export default function MenuPage() {
  return (
    <main className="simplePage">
      <a href="/" className="simpleLogo"><img src="/logo.svg" alt="Kale Txiki" /></a>
      <section>
        <p className="kicker">Menús y carta</p>
        <h1>Comer, cenar o picar algo en Lakuntza.</h1>
        <p>La oferta puede variar según temporada y disponibilidad. Para consultar el menú actualizado, llama al local.</p>
        <div className="simpleGrid">{items.map((item) => <article key={item}>{item}</article>)}</div>
        <a className="btn btnPrimary" href={site.phoneHref}>Llamar para reservar</a>
      </section>
    </main>
  );
}
