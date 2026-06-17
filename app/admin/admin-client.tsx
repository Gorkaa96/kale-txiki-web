"use client";

import { useEffect, useState } from "react";

const css = `.adminPage{min-height:100vh;background:#11100f;color:#faf8f3;padding:42px 22px 80px}.adminWrap{max-width:1180px;margin:0 auto}.adminTop{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:34px}.adminBrand{display:flex;align-items:center;gap:16px}.adminBrand img{width:82px;height:auto;filter:invert(1)}.adminBrand span{display:block;color:#c9c2b9;font-weight:800}.adminShell{display:grid;grid-template-columns:1fr 380px;gap:22px}.adminCard{background:#faf8f3;color:#171615;border-radius:28px;padding:28px;box-shadow:0 28px 90px rgba(0,0,0,.32)}.tabs{display:flex;gap:10px;margin-bottom:22px}.tab{border:1px solid rgba(15,15,14,.16);background:white;border-radius:999px;padding:11px 15px;font-weight:950}.tab.active{background:#11100f;color:#faf8f3}.adminCard h2{font-family:Georgia,serif;font-size:34px;margin:0 0 10px}.adminCard p{color:#706960;line-height:1.6}.field{display:grid;gap:8px;margin-top:18px}.field label{font-weight:900}.field input,.field textarea{border:1px solid rgba(15,15,14,.18);border-radius:16px;padding:13px 14px;font:inherit;background:white}.field textarea{min-height:112px;resize:vertical}.adminActions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}.adminButton{border:0;border-radius:999px;padding:13px 18px;font-weight:950;background:#11100f;color:#faf8f3}.adminButton.secondary{background:transparent;color:#11100f;border:1px solid rgba(15,15,14,.18)}.preview{position:sticky;top:24px}.previewBox{background:#fffdf8;border:1px solid rgba(15,15,14,.12);border-radius:22px;padding:22px;margin-top:18px}.previewBox h3{font-family:Georgia,serif;font-size:28px;margin:0 0 10px}.previewBox pre{white-space:pre-wrap;font:inherit;color:#4f4a45;line-height:1.55}.status{margin-top:16px;padding:14px 16px;background:#e7e1d8;color:#4f4a45;border-radius:16px;font-size:14px}.warning{margin-top:22px;background:#2a2118;border:1px solid rgba(255,255,255,.12);color:#f6eadb;border-radius:22px;padding:18px}.warning b{display:block;margin-bottom:6px}@media(max-width:980px){.adminTop{align-items:flex-start;flex-direction:column}.adminShell{grid-template-columns:1fr}.preview{position:static}.adminCard{padding:22px}.adminCard h2{font-size:28px}}`;

type Tab = "daily" | "weekend";

const emptyDraft = {
  date: "",
  firsts: "",
  seconds: "",
  dessert: "",
  weekendPeriod: "",
  weekendMenu: "",
  notes: "",
};

export default function AdminClient() {
  const [tab, setTab] = useState<Tab>("daily");
  const [draft, setDraft] = useState(emptyDraft);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem("kale-menu-draft");
    if (raw) setDraft(JSON.parse(raw));
  }, []);

  function update(key: keyof typeof draft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function saveLocal() {
    window.localStorage.setItem("kale-menu-draft", JSON.stringify(draft));
    setSaved(true);
  }

  const previewTitle = tab === "daily" ? "Menú del día" : "Fin de semana";
  const previewBody = tab === "daily" ? `Fecha: ${draft.date || "sin fecha"}\n\nPrimeros:\n${draft.firsts || "Pendiente"}\n\nSegundos:\n${draft.seconds || "Pendiente"}\n\nPostre / nota:\n${draft.dessert || "Pendiente"}` : `Periodo: ${draft.weekendPeriod || "sin periodo"}\n\nPropuesta:\n${draft.weekendMenu || "Pendiente"}\n\nNotas:\n${draft.notes || "Pendiente"}`;

  return <main className="adminPage"><style>{css}</style><div className="adminWrap"><header className="adminTop"><div className="adminBrand"><img src="/logo.png" alt="Kale Txiki" /><div><strong>Panel interno</strong><span>Gestión de menús</span></div></div><a className="adminButton secondary" href="/">Volver a la web</a></header><div className="adminShell"><section className="adminCard"><div className="tabs"><button className={tab === "daily" ? "tab active" : "tab"} onClick={() => setTab("daily")}>Menú del día</button><button className={tab === "weekend" ? "tab active" : "tab"} onClick={() => setTab("weekend")}>Fin de semana</button></div>{tab === "daily" ? <div><h2>Menú del día</h2><p>Prepara primeros, segundos y notas. El borrador queda guardado en este navegador.</p><div className="field"><label>Fecha</label><input type="date" value={draft.date} onChange={(e) => update("date", e.target.value)} /></div><div className="field"><label>Primeros</label><textarea value={draft.firsts} onChange={(e) => update("firsts", e.target.value)} placeholder="Un plato por línea" /></div><div className="field"><label>Segundos</label><textarea value={draft.seconds} onChange={(e) => update("seconds", e.target.value)} placeholder="Un plato por línea" /></div><div className="field"><label>Postre / nota</label><textarea value={draft.dessert} onChange={(e) => update("dessert", e.target.value)} placeholder="Precio, postre, pan, bebida o avisos" /></div></div> : <div><h2>Fin de semana</h2><p>Prepara la propuesta especial o menú de sábado/domingo.</p><div className="field"><label>Periodo</label><input value={draft.weekendPeriod} onChange={(e) => update("weekendPeriod", e.target.value)} placeholder="Ejemplo: sábado y domingo" /></div><div className="field"><label>Propuesta</label><textarea value={draft.weekendMenu} onChange={(e) => update("weekendMenu", e.target.value)} placeholder="Platos, raciones, carta o menú" /></div><div className="field"><label>Notas visibles</label><textarea value={draft.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Reservas, disponibilidad, precio..." /></div></div>}<div className="adminActions"><button className="adminButton" onClick={saveLocal}>Guardar borrador local</button><button className="adminButton secondary" disabled>Publicar en web</button></div><div className="status">{saved ? "Borrador guardado en este navegador." : "Cambios pendientes de guardar."}</div></section><aside className="adminCard preview"><h2>Vista previa</h2><p>Así se verá el contenido antes de publicarlo.</p><div className="previewBox"><h3>{previewTitle}</h3><pre>{previewBody}</pre></div><div className="warning"><b>Publicación real pendiente</b>Para publicar en la web pública necesitamos backend, base de datos y login. Este panel ya deja preparada la experiencia de uso.</div></aside></div></div></main>;
}
