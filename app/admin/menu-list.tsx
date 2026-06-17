import styles from "./admin.module.css";

type Menu = { id: string; menu_type: "daily" | "weekend"; title: string; menu_date: string | null; period_label: string | null; status: string };

function dateText(value: string | null) {
  return value ? new Intl.DateTimeFormat("es-ES").format(new Date(value)) : "Sin fecha";
}

export default function MenuList({ menus }: { menus: Menu[] }) {
  return <aside className={styles.darkCard}><div className={styles.kicker}>Estado</div><h2>Menús guardados</h2><div className={styles.stats}><div className={styles.stat}><strong>{menus.length}</strong><span>Total</span></div></div><div className={styles.list}>{menus.length === 0 ? <div className={styles.empty}>Aún no hay menús guardados.</div> : menus.map((menu) => <article className={styles.menuItem} key={menu.id}><div className={styles.menuItemTop}><strong>{menu.title}</strong><span className={styles.badge}>{menu.status}</span></div><p className={styles.meta}>{menu.menu_type} · {dateText(menu.menu_date)}{menu.period_label ? ` · ${menu.period_label}` : ""}</p></article>)}</div></aside>;
}
