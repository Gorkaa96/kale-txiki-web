import { site } from "../../lib/site";

export const metadata = {
  title: "Reservas",
  description: "Reserva mesa o consulta disponibilidad en Kale Txiki Taberna, Lakuntza.",
};

export default function Page() {
  return <main className="simplePage"><a href="/" className="simpleLogo"><img src="/logo.png" alt="Kale Txiki" /></a><section><p className="kicker">Reservas</p><h1>Reserva mesa o consulta disponibilidad.</h1><p>Para comer, cenar o venir el fin de semana, llama al local. Te confirmamos disponibilidad y resolvemos cualquier duda sobre menú, carta o barra.</p><div className="simpleBox"><strong>{site.phone}</strong><span>{site.address}</span><a className="btn btnPrimary" href={site.phoneHref}>Llamar ahora</a></div></section></main>;
}
