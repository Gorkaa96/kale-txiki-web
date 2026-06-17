import AdminClient from "./admin-client";

export default function Page({ searchParams }: { searchParams?: { ok?: string; error?: string } }) {
  return <AdminClient ok={searchParams?.ok === "1"} error={searchParams?.error === "1"} />;
}
