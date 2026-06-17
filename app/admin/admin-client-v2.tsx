"use client";

import { useEffect, useState } from "react";

const SUPABASE_URL = "https://vprczjegprkwzashxyul.supabase.co";
const SUPABASE_KEY = "sb_publishable_UUmTRnFTUlB1bO8klaWKSA_fyOoFcQX";

type Tab = "daily" | "weekend";
type Menu = {
  id?: string;
  menu_type: Tab;
  title: string;
  menu_date?: string;
  period_label?: string;
  first_courses?: string;
  second_courses?: string;
  desserts?: string;
  notes?: string;
  price?: string;
  status?: "draft" | "published" | "archived";
};

const empty: Menu = { menu_type: "daily", title: "Menú del día", status: "draft" };

const css = `.adminPage{min-height:100vh;background:#11100f;color:#faf8f3;padding:42px 22px 80px}.adminWrap{max-width:1180px;margin:0 auto}.adminTop{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:34px}.adminBrand{display:flex;align-items:center;gap:16px}.adminBrand img{width:82px;height:auto;filter:invert(1)}.adminBrand span{display:block;color:#c9c2b9;font-weight:800}.adminShell{display:grid;grid-template-columns:1fr 380px;gap:22px}.adminCard{background:#faf8f3;color:#171615;border-radius:28px;padding:28px;box-shadow:0 28px 90px rgba(0,0,0,.32)}.adminCard.dark{background:#1b1917;color:#faf8f3;border:1px solid rgba(255,255,255,.1)}.tabs{display:flex;gap:10px;margin-bottom:22px}.tab{border:1px solid rgba(15,15,14,.16);background:white;border-radius:999px;padding:11px 15px;font-weight:950}.tab.active{background:#11100f;color:#faf8f3}.adminCard h2{font-family:Georgia,serif;font-size:34px;margin:0 0 10px}.adminCard p{color:#706960;line-height:1.6}.dark p{color:#d7d0c6}.field{display:grid;gap:8px;margin-top:16px}.field label{font-weight:900}.field input,.field textarea{border:1px solid rgba(15,15,14,.18);border-radius:16px;padding:13px 14px;font:inherit;background:white}.field textarea{min-height:104px;resize:vertical}.adminActions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.adminButton{border:0;border-radius:999px;padding:13px 18px;font-weight:950;background:#11100f;color:#faf8f3}.adminButton.secondary{background:transparent;color:#11100f;border:1px solid rgba(15,15,14,.18)}.adminButton.light{background:#faf8f3;color:#11100f}.adminButton:disabled{opacity:.5;cursor:not-allowed}.previewBox{background:#fffdf8;border:1px solid rgba(15,15,14,.12);border-radius:22px;padding:22px;margin-top:18px}.previewBox h3{font-family:Georgia,serif;font-size:28px;margin:0 0 10px}.previewBox pre{white-space:pre-wrap;font:inherit;color:#4f4a45;line-height:1.55}.status{margin-top:16px;padding:14px 16px;background:#e7e1d8;color:#4f4a45;border-radius:16px;font-size:14px}.menuList{display:grid;gap:10px;margin-top:16px}.menuItem{border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:12px;background:rgba(255,255,255,.05)}.menuItem button{margin-top:8px}.badge{display:inline-flex;border-radius:999px;padding:4px 9px;font-size:12px;font-weight:950;background:#e7e1d8;color:#11100f}.loginBox{max-width:480px;margin:8vh auto 0}.error{background:#49211f;color:#fff0ed;border-radius:16px;padding:14px;margin-top:14px}@media(max-width:980px){.adminTop{align-items:flex-start;flex-direction:column}.adminShell{grid-template-columns:1fr}.adminCard{padding:22px}.adminCard h2{font-size:28px}}`;

async function api(path: string, token?: string, init?: RequestInit) {
  return fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token || SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
}

export default function AdminClientV2() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("daily");
  const [draft, setDraft] = useState<Menu>(empty);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [message, setMessage] = useState("Sin sesión iniciada.");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedToken = window.localStorage.getItem("kale-admin-token") || "";
    if (savedToken) {
      setToken(savedToken);
      loadMenus(savedToken);
    }
  }, []);

  function setField(key: keyof Menu, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function login() {
    setError("");
    setMessage("Iniciando sesión...");
    const response = await api(`/auth/v1/token?grant_type=password`, undefined, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      setError("No se ha podido iniciar sesión. Revisa email/contraseña y que el usuario esté dado de alta en Supabase Auth.");
      setMessage("Sin sesión iniciada.");
      return;
    }
    const data = await response.json();
    window.localStorage.setItem("kale-admin-token", data.access_token);
    setToken(data.access_token);
    setMessage("Sesión iniciada.");
    await loadMenus(data.access_token);
  }

  function logout() {
    window.localStorage.removeItem("kale-admin-token");
    setToken("");
    setMenus([]);
    setMessage("Sesión cerrada.");
  }

  async function loadMenus(authToken = token) {
    const response = await api(`/rest/v1/menus?select=*&order=updated_at.desc`, authToken);
    if (!response.ok) {
      setError("No se han podido cargar los menús. Es posible que el usuario no esté en admin_users.");
      return;
    }
    setMenus(await response.json());
  }

  async function save(status: "draft" | "published") {
    if (!token) return;
    setError("");
    const payload = { ...draft, menu_type: tab, status, published_at: status === "published" ? new Date().toISOString() : null };
    const path = draft.id ? `/rest/v1/menus?id=eq.${draft.id}` : `/rest/v1/menus`;
    const method = draft.id ? "PATCH" : "POST";
    const response = await api(path, token, { method, headers: { Prefer: "return=representation" }, body: JSON.stringify(payload) });
    if (!response.ok) {
      setError("No se ha podido guardar. Revisa permisos RLS/admin_users.");
      return;
    }
    const saved = await response.json();
    const row = Array.isArray(saved) ? saved[0] : saved;
    setDraft(row || empty);
    setMessage(status === "published" ? "Menú publicado." : "Borrador guardado.");
    await loadMenus();
  }

  function newMenu(nextTab: Tab) {
    setTab(nextTab);
    setDraft({ ...empty, menu_type: nextTab, title: nextTab === "daily" ? "Menú del día" : "Fin de semana" });
  }

  const preview = `Título: ${draft.title || "sin título"}\nTipo: ${tab === "daily" ? "Menú del día" : "Fin de semana"}\n\nPrimeros / propuesta:\n${draft.first_courses || "Pendiente"}\n\nSegundos:\n${draft.second_courses || "Pendiente"}\n\nPostres / notas:\n${draft.desserts || draft.notes || "Pendiente"}\n\nPrecio: ${draft.price || "sin indicar"}`;

  if (!token) {
    return <main className="adminPage"><style>{css}</style><section className="adminCard loginBox"><h2>Acceso admin</h2><p>Inicia sesión para gestionar los menús publicados en Kale Txiki.</p><div className="field"><label>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} /></div><div className="field"><label>Contraseña</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div><div className="adminActions"><button className="adminButton" onClick={login}>Entrar</button><a className="adminButton secondary" href="/">Volver a la web</a></div>{error ? <div className="error">{error}</div> : null}<div className="status">{message}</div></section></main>;
  }

  return <main className="adminPage"><style>{css}</style><div className="adminWrap"><header className="adminTop"><div className="adminBrand"><img src="/logo.png" alt="Kale Txiki" /><div><strong>Panel interno</strong><span>Menús reales desde Supabase</span></div></div><div className="adminActions"><a className="adminButton light" href="/menu">Ver menú público</a><button className="adminButton light" onClick={logout}>Cerrar sesión</button></div></header><div className="adminShell"><section className="adminCard"><div className="tabs"><button className={tab === "daily" ? "tab active" : "tab"} onClick={() => newMenu("daily")}>Nuevo diario</button><button className={tab === "weekend" ? "tab active" : "tab"} onClick={() => newMenu("weekend")}>Nuevo fin de semana</button></div><h2>{tab === "daily" ? "Menú del día" : "Fin de semana"}</h2><div className="field"><label>Título</label><input value={draft.title || ""} onChange={(e) => setField("title", e.target.value)} /></div><div className="field"><label>Fecha</label><input type="date" value={draft.menu_date || ""} onChange={(e) => setField("menu_date", e.target.value)} /></div><div className="field"><label>Periodo visible</label><input value={draft.period_label || ""} onChange={(e) => setField("period_label", e.target.value)} placeholder="Ejemplo: sábado y domingo" /></div><div className="field"><label>Primeros / propuesta</label><textarea value={draft.first_courses || ""} onChange={(e) => setField("first_courses", e.target.value)} /></div><div className="field"><label>Segundos</label><textarea value={draft.second_courses || ""} onChange={(e) => setField("second_courses", e.target.value)} /></div><div className="field"><label>Postres</label><textarea value={draft.desserts || ""} onChange={(e) => setField("desserts", e.target.value)} /></div><div className="field"><label>Notas</label><textarea value={draft.notes || ""} onChange={(e) => setField("notes", e.target.value)} /></div><div className="field"><label>Precio</label><input value={draft.price || ""} onChange={(e) => setField("price", e.target.value)} placeholder="Ejemplo: 15 €" /></div><div className="adminActions"><button className="adminButton" onClick={() => save("draft")}>Guardar borrador</button><button className="adminButton secondary" onClick={() => save("published")}>Publicar</button></div>{error ? <div className="error">{error}</div> : null}<div className="status">{message}</div></section><aside className="adminCard dark"><h2>Menús guardados</h2><div className="menuList">{menus.map((menu) => <div className="menuItem" key={menu.id}><strong>{menu.title}</strong><div><span className="badge">{menu.status}</span></div><button className="adminButton light" onClick={() => { setTab(menu.menu_type); setDraft(menu); }}>Editar</button></div>)}</div><div className="previewBox"><h3>Vista previa</h3><pre>{preview}</pre></div></aside></div></div></main>;
}
