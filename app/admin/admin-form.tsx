export default function AdminForm({ ok, error }: { ok?: boolean; error?: boolean }) {
  return <main style={{minHeight:"100vh",background:"#11100f",color:"#faf8f3",padding:"40px 20px"}}>
    <section style={{maxWidth:760,margin:"0 auto",background:"#faf8f3",color:"#171615",borderRadius:28,padding:28}}>
      <img src="/logo.png" alt="Kale Txiki" style={{width:120,height:"auto"}} />
      <h1 style={{fontFamily:"Georgia, serif",fontSize:42,margin:"18px 0 8px"}}>Panel de menús</h1>
      <p>Publica el menú diario o de fin de semana en la web pública. Este panel usa el Supabase exclusivo de Kale Txiki.</p>
      {ok ? <div style={{background:"#dff3df",border:"1px solid #9ecf9e",borderRadius:16,padding:14,marginTop:16,fontWeight:800}}>Menú guardado correctamente. Si lo has publicado, ya debería aparecer en la página de menú.</div> : null}
      {error ? <div style={{background:"#f3dfdc",border:"1px solid #d39a91",borderRadius:16,padding:14,marginTop:16,fontWeight:800}}>No se ha podido guardar. Revisa que el código admin sea correcto.</div> : null}
      <form action="/api/admin/menus/form" method="post" style={{display:"grid",gap:14,marginTop:24}}>
        <label><strong>Código admin</strong><br/><input name="code" type="password" required style={{width:"100%",padding:12,borderRadius:12,border:"1px solid #ccc"}} /></label>
        <label><strong>Tipo</strong><br/><select name="menu_type" style={{width:"100%",padding:12,borderRadius:12,border:"1px solid #ccc"}}><option value="daily">Menú diario</option><option value="weekend">Fin de semana</option></select></label>
        <label><strong>Título</strong><br/><input name="title" defaultValue="Menú del día" required style={{width:"100%",padding:12,borderRadius:12,border:"1px solid #ccc"}} /></label>
        <label><strong>Primeros / propuesta</strong><br/><textarea name="first_courses" rows={5} style={{width:"100%",padding:12,borderRadius:12,border:"1px solid #ccc"}} /></label>
        <label><strong>Segundos</strong><br/><textarea name="second_courses" rows={5} style={{width:"100%",padding:12,borderRadius:12,border:"1px solid #ccc"}} /></label>
        <label><strong>Postres</strong><br/><textarea name="desserts" rows={3} style={{width:"100%",padding:12,borderRadius:12,border:"1px solid #ccc"}} /></label>
        <label><strong>Precio</strong><br/><input name="price" placeholder="Ejemplo: 15 €" style={{width:"100%",padding:12,borderRadius:12,border:"1px solid #ccc"}} /></label>
        <label><strong>Notas</strong><br/><textarea name="notes" rows={3} style={{width:"100%",padding:12,borderRadius:12,border:"1px solid #ccc"}} /></label>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:8}}>
          <button name="status" value="draft" type="submit" style={{border:0,borderRadius:999,padding:"13px 18px",fontWeight:900,background:"#11100f",color:"#faf8f3"}}>Guardar borrador</button>
          <button name="status" value="published" type="submit" style={{border:"1px solid #11100f",borderRadius:999,padding:"13px 18px",fontWeight:900,background:"transparent",color:"#11100f"}}>Publicar</button>
          <a href="/menu" style={{padding:"13px 18px",fontWeight:900,color:"#11100f"}}>Ver menú público</a>
        </div>
      </form>
    </section>
  </main>;
}
