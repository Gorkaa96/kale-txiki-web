import SimpleShell from "../simple-shell";

export const metadata = { title: "Aviso legal" };

export default function Page() {
  return <SimpleShell kicker="Información legal" title="Aviso legal"><p>Esta web ofrece información general sobre Kale Txiki Taberna, su ubicación, teléfono y servicios de hostelería.</p><p>La información publicada puede variar según disponibilidad, temporada u organización interna del local. Para confirmar menús, horarios o reservas, contacta directamente por teléfono.</p></SimpleShell>;
}
