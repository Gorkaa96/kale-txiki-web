import { cookies } from "next/headers";
import { kaleSupabase } from "../../lib/kale-supabase";
import AdminLogin from "./admin-login";
import MenuEditor from "./menu-editor";
import MenuList from "./menu-list";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

type Menu = { id: string; menu_type: "daily" | "weekend"; title: string; menu_date: string | null; period_label: string | null; status: string };

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

export default async function Page({ searchParams }: { searchParams?: { ok?: string; error?: string; login_error?: string } }) {
  const cookieStore = await cookies();
  const code = cookieStore.get("kale_admin_code")?.value || "";

  if (!code) {
    return <AdminLogin loginError={searchParams?.login_error === "1"} />;
  }

  const menus = await getMenus(code);

  return <main className={styles.page}><div className={styles.wrap}><header className={styles.top}><div className={`${styles.brand} ${styles.brandSmall}`}><img src="/logo.png" alt="Kale Txiki" /><div><div className={styles.kicker}>Kale Txiki Taberna</div><h1 className={styles.title}>Panel de menús</h1><p className={styles.darkText}>Prepara menús por fecha, guárdalos como borrador y publica cuando quieras.</p></div></div><nav className={styles.navLinks}><a className={`${styles.button} ${styles.buttonLight}`} href="/menu">Ver menú público</a><a className={`${styles.button} ${styles.buttonLight}`} href="/">Volver a la web</a></nav></header><section className={styles.grid}><MenuEditor code={code} ok={searchParams?.ok === "1"} error={searchParams?.error === "1"} /><MenuList code={code} menus={menus} /></section></div></main>;
}
