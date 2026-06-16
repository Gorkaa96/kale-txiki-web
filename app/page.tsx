import { site } from "../lib/site";

const offers = [
  ["Menú entre semana", "Cocina cercana para comer bien en el día a día, con platos que cambian según temporada."],
  ["Fin de semana", "Una propuesta especial para venir con más calma en pareja, familia o cuadrilla."],
  ["Pintxos y vermut", "Barra, ambiente y ese plan de pasar a tomar algo y quedarse un rato."],
  ["Cenas informales", "Raciones, pizzas y hamburguesas caseras para compartir mesa sin complicaciones."],
];

const logoFix = `.header{height:74px!important;padding:0 18px 0 22px!important;overflow:hidden!important;align-items:center!important}.logo{height:54px!important;width:134px!important;flex:0 0 134px!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;overflow:hidden!important}.logo img{width:auto!important;height:auto!important;max-width:128px!important;max-height:50px!important;object-fit:contain!important}.nav{align-items:center!important}.reserveCard img{width:auto!important;height:auto!important;max-width:138px!important;max-height:112px!important;object-fit:contain!important}.footer img{width:auto!important;height:auto!important;max-width:145px!important;max-height:118px!important;object-fit:contain!important}@media(max-width:980px){.header{height:68px!important;padding-inline:18px!important}.logo{height:48px!important;width:116px!important;flex-basis:116px!important}.logo img{max-width:110px!important;max-height:44px!important}}@media(max-width:640px){.header{top:12px!important;width:calc(100% - 20px)!important}.logo{width:106px!important;flex-basis:106px!important}.logo img{max-width:100px!important;max-height:42px!important}}`;

export default function Home() {
  return (
    <main className="site">
      <style>{logoFix}</style>
      <header className="header">
        <a href="#inicio" className="logo" aria-label="Kale Txiki Taberna">
          <img src="/logo.png" alt="Kale Txiki" />
        </a>
        <nav className="nav" aria-label="Navegación principal">
          <a href="#menu">Menús</a>
          <a href="#local">Local</a>
          <a href="#galeria">Ambiente</a>
          <a href="#reservas">Reservas</a>
        </nav>
        <a className="headerCta" href={site.phoneHref}>Reservar</a>
      </header>

      <section className="hero" id="inicio">
        <div className="heroMedia" aria-label="Interior de Kale Txiki Taberna" />
        <div className="heroContent">
          <p className="kicker">Lakuntza · Taberna restaurante</p>
          <h1>Menús, barra y cenas en un local actual.</h1>
          <p className="heroLead">Kale Txiki es un punto de encuentro en Lakuntza para comer entre semana, disfrutar el fin de semana, tomar un vermut o cenar con los tuyos.</p>
          <div className="heroActions">
            <a className="btn btnPrimary" href={site.phoneHref}>Reservar por teléfono</a>
            <a className="btn btnSecondary" href="#menu">Ver menús y carta</a>
          </div>
          <div className="heroMeta">
            <span>Mikel Arregi Kalea, 3 · Lakuntza</span>
            <span>{site.phone}</span>
          </div>
        </div>
      </section>

      <section className="strip" aria-label="Servicios principales">
        <div><b>Menú diario</b><span>Entre semana</span></div>
        <div><b>Fin de semana</b><span>Comidas con reserva</span></div>
        <div><b>Barra</b><span>Pintxos y vermut</span></div>
        <div><b>Cenas</b><span>Raciones, pizzas y hamburguesas</span></div>
      </section>

      <section className="section" id="menu">
        <div className="container">
          <div className="sectionIntro">
            <p className="kicker">Menús y carta</p>
            <h2>Un plan para cada momento de la semana.</h2>
            <p>Para comer bien al mediodía, tomar algo en la barra o venir a cenar sin formalidades.</p>
          </div>
          <div className="cards">
            {offers.map(([title, text]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="local" id="local">
        <div className="localImage" />
        <div className="localCopy">
          <p className="kicker">El local</p>
          <h2>Madera clara, barra negra, tonos piedra y luz cálida.</h2>
          <p>Un espacio moderno y cómodo para comer al mediodía, tomar un vermut o alargar la tarde con una cena informal.</p>
        </div>
      </section>

      <section className="gallery" id="galeria">
        <div className="galleryHead">
          <p className="kicker">Ambiente</p>
          <h2>Un interior actual, reconocible y con carácter propio.</h2>
          <p>La estética se apoya en el propio local: madera clara, barra oscura, tonos piedra e iluminación cálida.</p>
        </div>
        <div className="galleryGrid">
          <div aria-label="Barra de Kale Txiki" />
          <div aria-label="Interior del local" />
          <div aria-label="Comedor de Kale Txiki" />
        </div>
      </section>

      <section className="reserve" id="reservas">
        <div>
          <p className="kicker">Reservas y contacto</p>
          <h2>¿Vienes a comer o cenar?</h2>
          <p>Para menús, cenas y fines de semana, llama al local y confirma disponibilidad.</p>
        </div>
        <aside className="reserveCard">
          <img src="/logo.png" alt="Kale Txiki" />
          <a className="phone" href={site.phoneHref}>{site.phone}</a>
          <span>{site.address}</span>
          <a className="btn btnLight" href={site.phoneHref}>Llamar ahora</a>
        </aside>
      </section>

      <footer className="footer">
        <div><img src="/logo.png" alt="Kale Txiki" /><p>{site.tagline}</p></div>
        <div><strong>Contacto</strong><a href={site.phoneHref}>{site.phone}</a><span>{site.address}</span></div>
        <div><strong>Web</strong><a href="/menu">Menú</a><a href="/reservas">Reservas</a><a href="/contacto">Contacto</a></div>
        <div><strong>Legal</strong><a href="/aviso-legal">Aviso legal</a><a href="/politica-privacidad">Privacidad</a><a href="/politica-cookies">Cookies</a></div>
      </footer>

      <div className="mobileBar">
        <a href="#menu">Menú</a>
        <a href={site.phoneHref}>Reservar</a>
        <a href={site.phoneHref}>Llamar</a>
      </div>
    </main>
  );
}
