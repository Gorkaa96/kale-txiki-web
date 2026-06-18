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

function MenuCard({ menu, code }: { menu: Menu; code: string }) {
  return <article className={styles.menuItem}><div className={styles.menuItemTop}><strong>{menu.title}</strong><span className={styles.badge}>{statusText(menu.status)}</span></div><p className={styles.meta}>{typeText(menu.menu_type)} · {dateText(menu.menu_date)}{menu.period_label ? ` · ${menu.period_label}` : ""}</p><div className={styles.actions}><a className={`${styles.button} ${styles.buttonLight}`} href={`/admin?edit=${menu.id}`}>Editar</a><form action="/api/admin/menus/status" method="post" className={styles.actions}><input type="hidden" name="code" value={code} /><input type="hidden" name="id" value={menu.id} />{menu.status !== "published" ? <button className={`${styles.button} ${styles.buttonLight}`} name="status" value="published" type="submit">Publicar</button> : null}{menu.status !== "archived" ? <button className={`${styles.button} ${styles.buttonLight}`} name="status" value="archived" type="submit">Archivar</button> : null}</form>{menu.status === "archived" ? <form action="/api/admin/menus/delete" method="post" className={styles.actions}><input type="hidden" name="code" value={code} /><input type="hidden" name="id" value={menu.id} /><button className={`${styles.button} ${styles.buttonDanger}`} type="submit">Eliminar definitivamente</button></form> : null}</div>{menu.status === "archived" ? <p className={styles.dangerText}>Archivado. Puedes eliminarlo si ya no lo necesitas.</p> : null}</article>;
}

function MenuSection({ title, menus, code }: { title: string; menus: Menu[]; code: string }) {
  return <section className={styles.menuSection}><div className={styles.sectionTitle}><span>{title}</span><small>{menus.length}</small></div>{menus.length === 0 ? <div className={styles.emptySmall}>Sin menús.</div> : <div className={styles.list}>{menus.map((menu) => <MenuCard key={menu.id} menu={menu} code={code} />)}</div>}</section>;
}

export default function MenuList({ menus, code }: { menus: Menu[]; code: string }) {
  const publicados = menus.filter((menu) => menu.status === "published");
  const borradores = menus.filter((menu) => menu.status === "draft");
  const archivados = menus.filter((menu) => menu.status === "archived");

  return <aside className={styles.darkCard}><div className={styles.kicker}>Menús</div><h2>Panel rápido</h2><p className={styles.panelHint}>Publica lo que quieras mostrar en la web. Para borrar un menú, archívalo primero.</p>{menus.length === 0 ? <div className={styles.empty}>Aún no hay menús guardados.</div> : <div className={styles.sections}><MenuSection title="Publicados" menus={publicados} code={code} /><MenuSection title="Borradores" menus={borradores} code={code} /><MenuSection title="Archivados" menus={archivados} code={code} /></div>}</aside>;
}
