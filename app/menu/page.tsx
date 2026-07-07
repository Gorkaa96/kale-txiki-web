import MenuDataView from "./menu-data-view";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Menús y carta",
  description: "Menú diario y propuesta de fin de semana de Kale Txiki Taberna, Lakuntza.",
};

export default function Page() {
  return <MenuDataView />;
}
