import styles from "./admin.module.css";

type Menu = { id: string; menu_type: "daily" | "weekend"; title: string; menu_date: string | null; period_label: string | null; status: string };

function dateText(value: string | null) {
  return value ? new Intl.DateTimeFormat("es-ES").format(new Date(value)) : "Sin fecha";
}

function typeText(value: string) {
  return value === "weekend" ? "Fin de semana" : "Menú diario";
}

function statusText(value: string) {
  if (value === "published") return "Publicado";
  if (value === "archived") return "Archivado";
  return "Borrador";
}

export default function MenuList({ menus, code }: { menus: Menu[]; code: string }) {
  return <aside className={styles.darkCard}><div className={styles.kicker}>Estado</div><h2>Menús guardados</h2><div className={styles.stats}><div className={styles.stat}><strong>{menus.length}</strong><span>Total</span></div></div><div className={styles.list}>{menus.length === 0 ? <div className={styles.empty}>Aún no hay menús guardados.</div> : menus.map((menu) => <article className={styles.menuItem} key={menu.id}><div className={styles.menuItemTop}><strong>{menu.title}</strong><span className={styles.badge}>{statusText(menu.status)}</span></div><p className={styles.meta}>{typeText(menu.menu_type)} · {dateText(menu.menu_date)}{menu.period_label ? ` · ${menu.period_label}` : ""}</p><div className={styles.actions}><a className={`${styles.button} ${styles.buttonLight}`} href={`/admin?edit=${menu.id}`}>Editar</a><form action="/api/admin/menus/status" method="post" className={styles.actions}><input type="hidden" name="code" value={code} /><input type="hidden" name="id" value={menu.id} />{menu.status !== "published" ? <button className={`${styles.button} ${styles.buttonLight}`} name="status" value="published" type="submit">Publicar</button> : null}{menu.status !== "archived" ? <button className={`${styles.button} ${styles.buttonLight}`} name="status" value="archived" type="submit">Archivar</button> : null}</form><form action="/api/admin/menus/delete" method="post" className={styles.actions}><input type="hidden" name="code" value={code} /><input type="hidden" name="id" value={menu.id} /><button className={`${styles.button} ${styles.buttonLight}`} type="submit">Eliminar</button></form></div></article>)}</div></aside>;
}
