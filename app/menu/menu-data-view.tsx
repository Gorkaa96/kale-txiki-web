import { getPublishedMenus, lines } from "../../lib/menus";
import SimpleShell, { ContactBox } from "../simple-shell";

export default async function MenuDataView() {
  const published = await getPublishedMenus();
  const latest = [
    published.find((menu) => menu.menu_type === "daily"),
    published.find((menu) => menu.menu_type === "weekend"),
  ].filter(Boolean);

  return <SimpleShell kicker="Menús y carta" title="Menú publicado por Kale Txiki." image>
    <style>{`.menuData{display:grid;gap:18px;margin-top:28px;max-width:780px}.menuData article{background:#fffdf8;border:1px solid rgba(15,15,14,.12);border-radius:22px;padding:22px}.menuData h2{font-family:Georgia,serif;font-size:30px;margin:0 0 12px}.menuData h3{margin:18px 0 8px;font-size:15px;color:#8a6c49;text-transform:uppercase;letter-spacing:.08em}.menuData ul{margin:0;padding-left:18px;line-height:1.8}.emptyMenu{background:#fffdf8;border:1px dashed rgba(15,15,14,.22);border-radius:22px;padding:22px;margin-top:28px;max-width:680px}`}</style>
    <p>Cuando el menú esté publicado desde el panel interno, aparecerá aquí automáticamente.</p>
    {latest.length === 0 ? <div className="emptyMenu"><strong>Menú pendiente de publicar</strong><p>Llámanos para consultar la propuesta del día.</p></div> : <div className="menuData">{latest.map((menu) => menu ? <article key={menu.id}><h2>{menu.title}</h2>{menu.period_label ? <p>{menu.period_label}</p> : null}{lines(menu.first_courses).length ? <><h3>Primeros / propuesta</h3><ul>{lines(menu.first_courses).map((item) => <li key={item}>{item}</li>)}</ul></> : null}{lines(menu.second_courses).length ? <><h3>Segundos</h3><ul>{lines(menu.second_courses).map((item) => <li key={item}>{item}</li>)}</ul></> : null}{lines(menu.desserts).length ? <><h3>Postre / nota</h3><ul>{lines(menu.desserts).map((item) => <li key={item}>{item}</li>)}</ul></> : null}{menu.price ? <p><strong>{menu.price}</strong></p> : null}{menu.notes ? <p>{menu.notes}</p> : null}</article> : null)}</div>}
    <ContactBox />
  </SimpleShell>;
}
