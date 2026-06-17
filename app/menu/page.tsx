import SimpleShell, { ContactBox } from "../simple-shell";

export const metadata = {
  title: "Menús y carta",
  description: "Menú diario, carta, pintxos, raciones, pizzas y hamburguesas en Kale Txiki Taberna, Lakuntza.",
};

const items = ["Menú diario", "Fin de semana", "Pintxos", "Vermut", "Raciones", "Pizzas", "Hamburguesas"];

export default function Page() {
  return <SimpleShell kicker="Menús y carta" title="Comer bien, tomar algo o cenar sin complicarse." image><p>Kale Txiki combina menú de entre semana, propuesta de fin de semana, barra de pintxos, vermut, raciones, pizzas y hamburguesas.</p><div className="simpleGrid">{items.map((item) => <article key={item}>{item}</article>)}</div><ContactBox /></SimpleShell>;
}
