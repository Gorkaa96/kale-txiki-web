import { site } from "../../lib/site";

export const metadata = {
  title: "Menús y carta",
  description: "Menú diario, carta, pintxos, raciones, pizzas y hamburguesas en Kale Txiki Taberna, Lakuntza.",
};

const items = ["Menú diario", "Menú fin de semana", "Pintxos", "Vermut", "Raciones", "Pizzas", "Hamburguesas"];

export default function MenuPage() {
  return (
    <main className="simplePage">
      <a href="/" className="simpleLogo"><img src="/logo.png" alt="Kale Txiki" /></a>
      <section>
        <p className="kicker">Menús y carta</p>
        <h1>Comer bien, tomar algo o cenar sin complicarse.</h1>
        <p>Kale Txiki combina menú de entre semana, propuesta de fin de semana, barra de pintxos, vermut, raciones, pizzas y hamburguesas. Para conocer la oferta actual, llama al local.</p>
        <div className="simpleGrid">{items.map((item) => <article key={item}>{item}</article>)}</div>
        <a className="btn btnPrimary" href={site.phoneHref}>Consultar disponibilidad</a>
      </section>
    </main>
  );
}
