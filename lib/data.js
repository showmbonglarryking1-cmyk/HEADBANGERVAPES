import { createClient } from "@/lib/supabase/server";

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  return data || {
    store_name: "Headbanger Vapes",
    hero_title: "Luxury Refillable Vape Devices & Accessories",
    hero_subtitle: "For adult customers shopping reusable vape kits, pods, coils and accessories."
  };
}

export async function getFeaturedProducts(limit = 6) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data || [];
}

export async function getAllProducts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getProductBySlug(slug) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  return data || null;
}

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  return data || [];
}
