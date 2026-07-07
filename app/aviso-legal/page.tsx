import SimpleShell from "../simple-shell";
import { site } from "../../lib/site";

export const metadata = { title: "Aviso legal" };

export default function Page() {
  return <SimpleShell kicker="Información legal" title="Aviso legal"><p>Esta web ofrece información general sobre Kale Txiki Taberna, su ubicación, teléfono y servicios de hostelería.</p><p>La información publicada puede variar según disponibilidad, temporada u organización interna del local. Para confirmar menús, horarios, reservas o alérgenos, contacta directamente por teléfono.</p><div className="simpleBox"><strong>Datos del establecimiento</strong><span>Kale Txiki Taberna</span><span>{site.address}</span><span>{site.phone}</span></div><p>Antes de la publicación con dominio definitivo, el titular deberá completar y validar los datos fiscales correspondientes: razón social o nombre del titular, NIF/CIF, domicilio fiscal y email de contacto legal.</p></SimpleShell>;
}
