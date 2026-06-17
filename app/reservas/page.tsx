import SimpleShell, { ContactBox } from "../simple-shell";

export const metadata = {
  title: "Reservas",
  description: "Reserva mesa o consulta disponibilidad en Kale Txiki Taberna, Lakuntza.",
};

export default function Page() {
  return <SimpleShell kicker="Reservas" title="Reserva mesa o consulta disponibilidad." image><p>Para comer, cenar o venir el fin de semana, llama al local. Te confirmamos disponibilidad y resolvemos cualquier duda sobre menú, carta o barra.</p><ContactBox /></SimpleShell>;
}
