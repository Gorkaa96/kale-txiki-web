import { cookies } from "next/headers";
import { kaleSupabase } from "../../../../lib/kale-supabase";
import AdminLogin from "../../admin-login";
import MenuEditor from "../../menu-editor";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

type Menu = { id: string; menu_type: "daily" | "weekend"; title: string; menu_date: string | null; period_label: string | null; first_courses: string | null; second_courses: string | null; desserts: string | null; notes: string | null; price: string | null; status: string };

async function codeIsValid(code: string) {
  const response = await fetch(`${kaleSupabase.url}/rest/v1/rpc/admin_code_ok`, {
    method: "POST",
    headers: { apikey: kaleSupabase.publishableKey, Authorization: `Bearer ${kaleSupabase.publishableKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ input_code: code }),
    cache: "no-store",
  });
  if (!response.ok) return false;
  return Boolean(await response.json());
}

async function getMenus(code: string): Promise<Menu[]> {
  const response = await fetch(`${kaleSupabase.url}/rest/v1/rpc/list_menus_with_code`, {
    method: "POST",
    headers: { apikey: kaleSupabase.publishableKey, Authorization: `Bearer ${kaleSupabase.publishableKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ input_code: code }),
    cache: "no-store",
  });
  if (!response.ok) return [];
  return response.json();
}

export default async function EditMenuPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const code = cookieStore.get("kale_admin_code")?.value || "";
  if (!code || !(await codeIsValid(code))) return <AdminLogin loginError />;

  const menus = await getMenus(code);
  const menu = menus.find((item) => item.id === params.id);

  return <main className={styles.page}><div className={styles.wrap}><header className={styles.top}><div><div className={styles.kicker}>Editar menú</div><h1 className={styles.title}>Actualizar menú</h1><p className={styles.darkText}>Modifica un menú existente sin crear duplicados.</p></div><nav className={styles.navLinks}><a className={`${styles.button} ${styles.buttonLight}`} href="/admin">Volver al panel</a><a className={`${styles.button} ${styles.buttonLight}`} href="/menu">Ver menú público</a></nav></header>{menu ? <MenuEditor code={code} menu={menu} /> : <section className={styles.card}><h2>Menú no encontrado</h2><p>No se ha encontrado este menú o no tienes permiso para verlo.</p><a className={styles.button} href="/admin">Volver al panel</a></section>}</div></main>;
}
