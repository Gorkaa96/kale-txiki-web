import SimpleShell, { ContactBox } from "../simple-shell";

export const metadata = {
  title: "Contacto",
  description: "Contacto, dirección y teléfono de Kale Txiki Taberna en Lakuntza.",
};

export default function Page() {
  return <SimpleShell kicker="Contacto" title="Estamos en el centro de Lakuntza." image><p>Ven a comer, tomar algo en la barra o cenar con los tuyos. Para reservas o consultas, contacta directamente con el local.</p><ContactBox /></SimpleShell>;
}
