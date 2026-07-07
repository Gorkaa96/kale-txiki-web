import SimpleShell from "../simple-shell";
import { site } from "../../lib/site";

export const metadata = { title: "Política de privacidad" };

export default function Page() {
  return <SimpleShell kicker="Privacidad" title="Política de privacidad"><p>Esta web tiene finalidad informativa y de contacto. No incluye formularios propios de recogida de datos personales en esta versión.</p><p>Cuando el usuario llama al establecimiento o contacta por los medios publicados, los datos que facilite se utilizarán únicamente para atender su consulta, gestionar una reserva o responder a una solicitud relacionada con el servicio de hostelería.</p><div className="simpleBox"><strong>Contacto directo</strong><span>{site.phone}</span><span>{site.address}</span></div><p>Antes de la publicación con dominio definitivo, el titular deberá completar la información legal del responsable del tratamiento si se incorporan formularios, reservas online, analítica avanzada o herramientas externas adicionales.</p></SimpleShell>;
}
