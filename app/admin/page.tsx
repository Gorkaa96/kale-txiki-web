import { cookies } from "next/headers";
import { kaleSupabase } from "../../lib/kale-supabase";
import AdminLogin from "./admin-login";
import MenuEditor from "./menu-editor";
import MenuList from "./menu-list";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

type Params = { ok?: string; error?: string; login_error?: string; edit?: string };
type Menu = { id: string; menu_type: "daily" | "weekend"; title: string; menu_date: string | null; period_label: string | null; first_courses: string | null; second_courses: string | null; desserts: string | null; notes: string | null; price: string | null; status: string };

async function codeIsValid(code: string) {
  if (!code) return false;
  const response = await fetch(`${kaleSupabase.url}/rest/v1/rpc/admin_code_ok`, {
    method: "POST",
    headers: {
      apikey: kaleSupabase.publishableKey,
      Authorization: `Bearer ${kaleSupabase.publishableKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input_code: code }),
    cache: "no-store",
  });
  if (!response.ok) return false;
  return Boolean(await response.json());
}

async function getMenus(code: string): Promise<Menu[]> {
  if (!code) return [];
  const response = await fetch(`${kaleSupabase.url}/rest/v1/rpc/list_menus_with_code`, {
    method: "POST",
    headers: {
      apikey: kaleSupabase.publishableKey,
      Authorization: `Bearer ${kaleSupabase.publishableKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input_code: code }),
    cache: "no-store",
  });
  if (!response.ok) return [];
  return response.json();
}

function statusWeight(status: string) {
  if (status === "published") return 1;
  if (status === "draft") return 2;
  return 3;
}

function sortMenus(menus: Menu[]) {
  return [...menus].sort((a, b) => {
    const statusDiff = statusWeight(a.status) - statusWeight(b.status);
    if (statusDiff !== 0) return statusDiff;
    const aTime = a.menu_date ? new Date(a.menu_date).getTime() : 0;
    const bTime = b.menu_date ? new Date(b.menu_date).getTime() : 0;
    return bTime - aTime;
  });
}

export default async function Page({ searchParams }: { searchParams?: Params | Promise<Params> }) {
  const params = await Promise.resolve(searchParams || {});
  const cookieStore = await cookies();
  const code = cookieStore.get("kale_admin_code")?.value || "";

  if (!code) {
    return <AdminLogin loginError={params.login_error === "1"} />;
  }

  const valid = await codeIsValid(code);
  if (!valid) {
    return <AdminLogin loginError />;
  }

  const menus = sortMenus(await getMenus(code));
  const selectedMenu = params.edit ? menus.find((menu) => menu.id === params.edit) : undefined;

  return <main className={styles.page}><div className={styles.wrap}><header className={styles.top}><div className={`${styles.brand} ${styles.brandSmall}`}><img src="/logo.png" alt="Kale Txiki" /><div><div className={styles.kicker}>Kale Txiki Taberna</div><h1 className={styles.title}>Panel de menús</h1><p className={styles.darkText}>Prepara menús por fecha, guárdalos como borrador y publica cuando quieras.</p></div></div><nav className={styles.navLinks}><a className={`${styles.button} ${styles.buttonLight}`} href="/menu">Ver menú público</a><a className={`${styles.button} ${styles.buttonLight}`} href="/">Volver a la web</a><a className={`${styles.button} ${styles.buttonSecondary}`} href="/api/admin/logout">Cerrar sesión</a></nav></header><section className={styles.grid}><MenuEditor code={code} menu={selectedMenu} ok={params.ok === "1"} error={params.error === "1"} /><MenuList code={code} menus={menus} /></section></div></main>;
}
