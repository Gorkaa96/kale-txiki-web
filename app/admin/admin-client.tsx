import AdminForm from "./admin-form";

export default function AdminClient(props: { ok?: boolean; error?: boolean }) {
  return <AdminForm {...props} />;
}
