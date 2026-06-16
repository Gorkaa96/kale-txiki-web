import { site } from "../../lib/site";

export const metadata = {
  title: "Contacto",
  description: "Contacto, dirección y teléfono de Kale Txiki Taberna en Lakuntza.",
};

export default function ContactoPage() {
  return (
    <main className="simplePage">
      <a href="/" className="simpleLogo"><img src="/logo.png" alt="Kale Txiki" /></a>
      <section>
        <p className="kicker">Contacto</p>
        <h1>Estamos en el centro de Lakuntza.</h1>
        <p>Ven a comer, tomar algo en la barra o cenar con los tuyos. Para reservas o consultas, contacta directamente con el local.</p>
        <div className="simpleBox">
          <strong>{site.phone}</strong>
          <span>{site.address}</span>
          <a className="btn btnPrimary" href={site.phoneHref}>Llamar al local</a>
        </div>
      </section>
    </main>
  );
}
