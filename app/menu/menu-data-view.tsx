import { site } from "../../lib/site";
import { getPublishedMenus, lines, type PublishedMenu } from "../../lib/menus";
import SimpleShell from "../simple-shell";
import styles from "./menu.module.css";

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "2-digit", month: "long" }).format(new Date(value));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function pickCurrentMenu(menus: PublishedMenu[], type: PublishedMenu["menu_type"]) {
  const items = menus.filter((menu) => menu.menu_type === type);
  const today = todayKey();
  const upcoming = items
    .filter((menu) => menu.menu_date && menu.menu_date >= today)
    .sort((a, b) => String(a.menu_date).localeCompare(String(b.menu_date)));

  return upcoming[0] || items[0];
}

export default async function MenuDataView() {
  const published = await getPublishedMenus();
  const latest = [pickCurrentMenu(published, "daily"), pickCurrentMenu(published, "weekend")].filter(Boolean);

  return <SimpleShell kicker="Menús y carta" title="Menús publicados de Kale Txiki." image>
    <div className={styles.menuWrap}>
      <section className={styles.menuIntro}><div><strong>Consulta la propuesta disponible</strong><p className={styles.meta}>Menú diario, fin de semana y propuestas actualizadas desde el panel interno.</p></div><div className={styles.menuActions}><a className={styles.btn} href={site.phoneHref}>Reservar por teléfono</a><a className={`${styles.btn} ${styles.btnAlt}`} href="/">Volver a la web</a></div></section>
      {latest.length === 0 ? <div className={styles.emptyMenu}><strong>Menú pendiente de publicar</strong><p>Llámanos para consultar la propuesta del día o reservar mesa.</p></div> : <div className={styles.menuGrid}>{latest.map((menu) => menu ? <article className={styles.menuCard} key={menu.id}><div className={styles.menuCardTop}><div><h2>{menu.title}</h2><p className={styles.meta}>{menu.period_label || formatDate(menu.menu_date) || (menu.menu_type === "daily" ? "Menú diario" : "Fin de semana")}</p></div><span className={styles.badge}>{menu.menu_type === "daily" ? "Diario" : "Fin de semana"}</span></div>{lines(menu.first_courses).length ? <section className={styles.section}><h3>Primeros / propuesta</h3><ul>{lines(menu.first_courses).map((item) => <li key={item}>{item}</li>)}</ul></section> : null}{lines(menu.second_courses).length ? <section className={styles.section}><h3>Segundos</h3><ul>{lines(menu.second_courses).map((item) => <li key={item}>{item}</li>)}</ul></section> : null}{lines(menu.desserts).length ? <section className={styles.section}><h3>Postre</h3><ul>{lines(menu.desserts).map((item) => <li key={item}>{item}</li>)}</ul></section> : null}{menu.price ? <div className={styles.price}>{menu.price}</div> : null}{menu.notes ? <p className={styles.notes}>{menu.notes}</p> : null}</article> : null)}</div>}
      <section className={styles.contactStrip}><div><strong>Reserva o consulta el menú</strong><p>Para confirmar disponibilidad, precio o alérgenos, lo más rápido es llamarnos.</p></div><div className={styles.menuActions}><a className={styles.btn} href={site.phoneHref}>{site.phone}</a><a className={`${styles.btn} ${styles.btnAlt}`} href={site.mapsUrl}>Cómo llegar</a></div></section>
    </div>
  </SimpleShell>;
}
