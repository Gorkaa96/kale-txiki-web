import styles from "./admin.module.css";

type EditableMenu = {
  id: string;
  menu_type: "daily" | "weekend";
  title: string;
  menu_date: string | null;
  period_label: string | null;
  first_courses: string | null;
  second_courses: string | null;
  desserts: string | null;
  notes: string | null;
  price: string | null;
  status: string;
};

export default function MenuEditor({ ok, error, code, menu }: { ok?: boolean; error?: boolean; code: string; menu?: EditableMenu }) {
  const editing = Boolean(menu);
  return <article className={styles.card}><div className={styles.kicker}>{editing ? "Editar menú" : "Nuevo menú"}</div><h2>{editing ? "Actualizar menú guardado" : "Crear o dejar preparado"}</h2><p className={styles.subtitle}>Usa una fecha para preparar menús futuros. Al publicar, aparecerá en la página pública.</p>{ok ? <div className={styles.alertOk}>Menú guardado correctamente.</div> : null}{error ? <div className={styles.alertError}>No se ha podido guardar. Revisa los datos.</div> : null}<form action="/api/admin/menus/form" method="post" className={styles.form}><input type="hidden" name="code" value={code} />{menu ? <input type="hidden" name="id" value={menu.id} /> : null}<div className={styles.row}><div className={styles.field}><label>Tipo de menú</label><select className={styles.select} name="menu_type" defaultValue={menu?.menu_type || "daily"}><option value="daily">Menú diario</option><option value="weekend">Fin de semana</option></select></div><div className={styles.field}><label>Fecha del menú</label><input className={styles.input} name="menu_date" type="date" defaultValue={menu?.menu_date || ""} /></div></div><div className={styles.field}><label>Periodo visible</label><input className={styles.input} name="period_label" defaultValue={menu?.period_label || ""} placeholder="Ejemplo: lunes 17 de junio" /></div><div className={styles.field}><label>Título</label><input className={styles.input} name="title" defaultValue={menu?.title || "Menú del día"} required /></div><div className={styles.field}><label>Primeros / propuesta</label><textarea className={styles.textarea} name="first_courses" defaultValue={menu?.first_courses || ""} placeholder="Un plato por línea" /></div><div className={styles.field}><label>Segundos</label><textarea className={styles.textarea} name="second_courses" defaultValue={menu?.second_courses || ""} placeholder="Un plato por línea" /></div><div className={styles.row}><div className={styles.field}><label>Postres</label><textarea className={styles.textarea} name="desserts" defaultValue={menu?.desserts || ""} /></div><div className={styles.field}><label>Precio</label><input className={styles.input} name="price" defaultValue={menu?.price || ""} placeholder="Ejemplo: 15 €" /></div></div><div className={styles.field}><label>Notas visibles</label><textarea className={styles.textarea} name="notes" defaultValue={menu?.notes || ""} /></div><div className={styles.actions}><button className={styles.button} name="status" value="draft" type="submit">Guardar borrador</button><button className={`${styles.button} ${styles.buttonSecondary}`} name="status" value="published" type="submit">Publicar ahora</button>{editing ? <a className={`${styles.button} ${styles.buttonSecondary}`} href="/admin">Crear nuevo</a> : null}</div></form></article>;
}
