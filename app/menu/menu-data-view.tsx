import { site } from "../../lib/site";
import { getPublishedMenus, lines, type PublishedMenu } from "../../lib/menus";
import SimpleShell from "../simple-shell";
import styles from "./menu.module.css";

const carta = [
  { title: "Hamburguesas", items: ["Hamburguesas de la casa", "Opciones completas para cena informal", "Consulta disponibilidad y acompañamientos"] },
  { title: "Pizzas", items: ["Pizzas para compartir", "Perfectas para cenas y grupos", "Pregunta por las variedades disponibles"] },
  { title: "Raciones", items: ["Raciones para picar", "Platos al centro", "Ideal para compartir en cuadrilla"] },
  { title: "Pintxos", items: ["Pintxos y barra", "Propuestas de temporada", "Buen plan para vermouth o poteo"] },
  { title: "Cenas", items: ["Cenas en ambiente de taberna", "Hamburguesas, pizzas y platos para compartir", "Reserva recomendada"] },
];

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date(value));
}

function todayKey() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid" }).format(new Date());
}

function typeLabel(value: PublishedMenu["menu_type"]) {
  return value === "weekend" ? "Fin de semana" : "Menú diario";
}

function pickCurrentMenu(menus: PublishedMenu[], type: PublishedMenu["menu_type"]) {
  const items = menus.filter((menu) => menu.menu_type === type);
  const today = todayKey();
  const upcoming = items
    .filter((menu) => menu.menu_date && menu.menu_date >= today)
    .sort((a, b) => String(a.menu_date).localeCompare(String(b.menu_date)));

  return upcoming[0] || items[0];
}

function DishSection({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return <section className={styles.section}><h3>{title}</h3><ul>{items.map((item, index) => <li key={`${title}-${index}-${item}`}>{item}</li>)}</ul></section>;
}

function MenuCard({ menu }: { menu: PublishedMenu }) {
  const firstCourses = lines(menu.first_courses);
  const secondCourses = lines(menu.second_courses);
  const desserts = lines(menu.desserts);
  const date = menu.period_label || formatDate(menu.menu_date) || typeLabel(menu.menu_type);

  return <article className={styles.menuCard}><div className={styles.menuCardTop}><div><span className={styles.eyebrow}>{typeLabel(menu.menu_type)}</span><h2>{menu.title}</h2><p className={styles.meta}>{date}</p></div></div><div className={styles.divider} /><DishSection title="Primeros / propuesta" items={firstCourses} /><DishSection title="Segundos" items={secondCourses} /><DishSection title="Postres" items={desserts} />{menu.price ? <div className={styles.price}><span>Precio</span><strong>{menu.price}</strong></div> : null}{menu.notes ? <p className={styles.notes}>{menu.notes}</p> : null}</article>;
}

function CartaFija() {
  return <section className={styles.cartaBlock}><div className={styles.cartaHead}><span className={styles.eyebrow}>También en Kale Txiki</span><h2>Carta y propuestas habituales</h2><p>Además del menú publicado, puedes consultar en barra o por teléfono las opciones disponibles para picar, cenar o compartir.</p></div><div className={styles.cartaGrid}>{carta.map((group) => <article className={styles.cartaCard} key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>;
}

export default async function MenuDataView() {
  const published = await getPublishedMenus();
  const latest = [pickCurrentMenu(published, "daily"), pickCurrentMenu(published, "weekend")].filter(Boolean) as PublishedMenu[];

  return <SimpleShell kicker="Menús" title="La propuesta de Kale Txiki." image>
    <div className={styles.menuWrap}>
      <section className={styles.menuIntro}><div><span className={styles.eyebrow}>Actualizado desde cocina</span><strong>Menú diario y fin de semana</strong><p className={styles.meta}>Consulta la propuesta disponible. Para confirmar disponibilidad, precio o alérgenos, llámanos y te atendemos al momento.</p></div><div className={styles.menuActions}><a className={styles.btn} href={site.phoneHref}>Reservar por teléfono</a><a className={`${styles.btn} ${styles.btnAlt}`} href={site.mapsUrl}>Cómo llegar</a></div></section>

      {latest.length === 0 ? <div className={styles.emptyMenu}><span className={styles.eyebrow}>Menú pendiente</span><strong>Estamos preparando la propuesta.</strong><p>Llámanos para consultar el menú del día o reservar mesa.</p><a className={styles.btn} href={site.phoneHref}>{site.phone}</a></div> : <div className={styles.menuGrid}>{latest.map((menu) => <MenuCard menu={menu} key={menu.id} />)}</div>}

      <CartaFija />

      <section className={styles.notice}><strong>Información importante</strong><p>Los platos pueden variar según disponibilidad. Consulta al equipo si tienes alergias o intolerancias.</p></section>

      <section className={styles.contactStrip}><div><strong>Reserva o consulta el menú</strong><p>Estamos en {site.address}. También puedes llamarnos directamente.</p></div><div className={styles.menuActions}><a className={styles.btn} href={site.phoneHref}>{site.phone}</a><a className={`${styles.btn} ${styles.btnAlt}`} href="/">Volver a la web</a></div></section>
    </div>
  </SimpleShell>;
}
