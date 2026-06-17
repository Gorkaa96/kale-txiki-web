export type PublishedMenu = {
  id: string;
  menu_type: "daily" | "weekend";
  title: string;
  menu_date: string | null;
  period_label: string | null;
  first_courses: string | null;
  second_courses: string | null;
  desserts: string | null;
  notes: string | null;
  price: string | null;
  published_at: string | null;
};

const SUPABASE_URL = "https://vprczjegprkwzashxyul.supabase.co";
const SUPABASE_KEY = "sb_publishable_UUmTRnFTUlB1bO8klaWKSA_fyOoFcQX";

export async function getPublishedMenus(): Promise<PublishedMenu[]> {
  const params = new URLSearchParams({
    select: "id,menu_type,title,menu_date,period_label,first_courses,second_courses,desserts,notes,price,published_at",
    status: "eq.published",
    order: "published_at.desc.nullslast,menu_date.desc.nullslast,created_at.desc",
  });

  const response = await fetch(`${SUPABASE_URL}/rest/v1/menus?${params.toString()}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export function lines(value: string | null | undefined) {
  return (value ?? "").split("\n").map((item) => item.trim()).filter(Boolean);
}
