import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminGuard({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  if (!admin) {
    redirect("/admin/login?error=not-admin");
  }

  return children;
}
