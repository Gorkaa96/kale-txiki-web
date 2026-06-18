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

function okMessage(value?: string) {
  if (value === "published") return "Menú publicado en la web.";
  if (value === "saved") return "Menú guardado como borrador.";
  if (value === "duplicated") return "Menú duplicado. Ya puedes editar la copia.";
  if (value === "archived") return "Menú archivado correctamente.";
  if (value === "deleted") return "Menú eliminado definitivamente.";
  if (value) return "Acción realizada correctamente.";
  return "";
}

export default function MenuEditor({ ok, error, code, menu }: { ok?: string; error?: boolean; code: string; menu?: EditableMenu }) {
  const editing = Boolean(menu);
  const selectedType = menu?.menu_type || "daily";
  const message = okMessage(ok);
  return <article className={styles.card}><div className={styles.kicker}>{editing ? "Editar menú" : "Nuevo menú"}</div><h2>{editing ? "Actualizar menú" : "Crear menú"}</h2><p className={styles.subtitle}>Rellena solo lo necesario. Guarda como borrador o publícalo directamente en la web.</p>{message ? <div className={styles.alertOk}>{message}</div> : null}{error ? <div className={styles.alertError}>No se ha podido completar la acción. Revisa los datos.</div> : null}<form action="/api/admin/menus/form" method="post" className={styles.form}><input type="hidden" name="code" value={code} />{menu ? <input type="hidden" name="id" value={menu.id} /> : null}<input type="hidden" name="period_label" value={menu?.period_label || ""} /><div className={styles.typeGrid}><label className={styles.typeCard}><input type="radio" name="menu_type" value="daily" defaultChecked={selectedType === "daily"} /><span><strong>Menú diario</strong><small>Para comidas de lunes a viernes</small></span></label><label className={styles.typeCard}><input type="radio" name="menu_type" value="weekend" defaultChecked={selectedType === "weekend"} /><span><strong>Fin de semana</strong><small>Para sábado, domingo o festivos</small></span></label></div><div className={styles.field}><label>Fecha</label><input className={styles.input} name="menu_date" type="date" defaultValue={menu?.menu_date || ""} /></div><div className={styles.field}><label>Primeros / propuesta</label><textarea className={styles.textarea} name="first_courses" defaultValue={menu?.first_courses || ""} placeholder="Un plato por línea" /></div><div className={styles.field}><label>Segundos</label><textarea className={styles.textarea} name="second_courses" defaultValue={menu?.second_courses || ""} placeholder="Un plato por línea" /></div><div className={styles.row}><div className={styles.field}><label>Postres</label><textarea className={styles.textarea} name="desserts" defaultValue={menu?.desserts || ""} placeholder="Un postre por línea" /></div><div className={styles.field}><label>Precio</label><input className={styles.input} name="price" defaultValue={menu?.price || ""} placeholder="Ejemplo: 15 €" /></div></div><div className={styles.field}><label>Notas visibles</label><textarea className={styles.textareaSmall} name="notes" defaultValue={menu?.notes || ""} placeholder="Ejemplo: bebida no incluida, consultar alérgenos..." /></div><div className={styles.actions}><button className={styles.button} name="status" value="draft" type="submit">Guardar borrador</button><button className={`${styles.button} ${styles.buttonSecondary}`} name="status" value="published" type="submit">Publicar</button>{editing ? <a className={`${styles.button} ${styles.buttonSecondary}`} href="/admin">Crear nuevo</a> : null}</div></form></article>;
}
