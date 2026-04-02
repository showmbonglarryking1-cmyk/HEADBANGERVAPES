"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { slugify } from "@/lib/utils";

const emptyForm = {
  id: "",
  name: "",
  slug: "",
  category_id: "",
  brand: "",
  sku: "",
  price_gbp: "",
  compare_at_price_gbp: "",
  stock_quantity: 0,
  short_description: "",
  description: "",
  image_url: "",
  is_active: true,
  is_featured: false
};

export default function ProductManager({ initialProducts = [], categories = [] }) {
  const supabase = createClient();
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const fileRef = useRef(null);

  function resetForm() {
    setForm(emptyForm);
  }

  useEffect(() => setProducts(initialProducts), [initialProducts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.slug, p.brand, p.sku, p.categories?.name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [products, search]);

  function setField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "name" && !prev.id ? { slug: slugify(value) } : {})
    }));
  }

  async function uploadImage(file) {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `products/${fileName}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false
    });
    if (error) throw error;

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg("Uploading image...");
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, image_url: url }));
      setMsg("Image uploaded.");
    } catch (err) {
      setMsg(err.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function refreshProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name, slug)")
      .order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
  }

  async function saveProduct(e) {
    e.preventDefault();
    setBusy(true);
    setMsg("");

    const payload = {
      name: form.name,
      slug: slugify(form.slug || form.name),
      category_id: form.category_id || null,
      brand: form.brand || null,
      sku: form.sku || null,
      price_gbp: Number(form.price_gbp || 0),
      compare_at_price_gbp: form.compare_at_price_gbp ? Number(form.compare_at_price_gbp) : null,
      stock_quantity: Number(form.stock_quantity || 0),
      short_description: form.short_description || null,
      description: form.description || null,
      image_url: form.image_url || null,
      is_active: !!form.is_active,
      is_featured: !!form.is_featured
    };

    let result;
    if (form.id) {
      result = await supabase.from("products").update(payload).eq("id", form.id);
    } else {
      result = await supabase.from("products").insert(payload);
    }

    if (result.error) {
      setMsg(result.error.message);
    } else {
      setMsg(form.id ? "Product updated." : "Product created.");
      resetForm();
      await refreshProducts();
    }
    setBusy(false);
  }

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) setMsg(error.message);
    else {
      setMsg("Product deleted.");
      await refreshProducts();
      if (form.id === id) resetForm();
    }
  }

  function editProduct(product) {
    setForm({
      id: product.id,
      name: product.name || "",
      slug: product.slug || "",
      category_id: product.category_id || "",
      brand: product.brand || "",
      sku: product.sku || "",
      price_gbp: product.price_gbp || "",
      compare_at_price_gbp: product.compare_at_price_gbp || "",
      stock_quantity: product.stock_quantity || 0,
      short_description: product.short_description || "",
      description: product.description || "",
      image_url: product.image_url || "",
      is_active: !!product.is_active,
      is_featured: !!product.is_featured
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div className="card">
        <div className="section-head">
          <div>
            <h2 style={{fontSize:34}}>{form.id ? "Edit Product" : "Add Product"}</h2>
            <p>Create products directly from admin. No code editing needed.</p>
          </div>
          <div className="split-actions">
            <button className="btn" type="button" onClick={resetForm}>New Blank</button>
          </div>
        </div>

        {msg ? <div className="notice" style={{marginBottom:16}}>{msg}</div> : null}

        <form onSubmit={saveProduct}>
          <div className="form-grid">
            <div>
              <label className="label">Product name</label>
              <input className="input" value={form.name} onChange={(e) => setField("name", e.target.value)} required />
            </div>
            <div>
              <label className="label">Slug</label>
              <input className="input" value={form.slug} onChange={(e) => setField("slug", e.target.value)} required />
            </div>
            <div>
              <label className="label">Category</label>
              <select className="select" value={form.category_id} onChange={(e) => setField("category_id", e.target.value)}>
                <option value="">No category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Brand</label>
              <input className="input" value={form.brand} onChange={(e) => setField("brand", e.target.value)} />
            </div>
            <div>
              <label className="label">SKU</label>
              <input className="input" value={form.sku} onChange={(e) => setField("sku", e.target.value)} />
            </div>
            <div>
              <label className="label">Stock quantity</label>
              <input className="input" type="number" value={form.stock_quantity} onChange={(e) => setField("stock_quantity", e.target.value)} />
            </div>
            <div>
              <label className="label">Price (GBP)</label>
              <input className="input" type="number" step="0.01" value={form.price_gbp} onChange={(e) => setField("price_gbp", e.target.value)} required />
            </div>
            <div>
              <label className="label">Compare at price</label>
              <input className="input" type="number" step="0.01" value={form.compare_at_price_gbp} onChange={(e) => setField("compare_at_price_gbp", e.target.value)} />
            </div>
            <div className="full">
              <label className="label">Short description</label>
              <textarea className="textarea" value={form.short_description} onChange={(e) => setField("short_description", e.target.value)} />
            </div>
            <div className="full">
              <label className="label">Full description</label>
              <textarea className="textarea" value={form.description} onChange={(e) => setField("description", e.target.value)} />
            </div>
            <div className="full">
              <label className="label">Image URL</label>
              <input className="input" value={form.image_url} onChange={(e) => setField("image_url", e.target.value)} placeholder="https://..." />
            </div>
            <div className="full">
              <label className="label">Or upload image</label>
              <div className="split-actions">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} />
              </div>
            </div>
            <div>
              <label className="label">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setField("is_active", e.target.checked)} /> Active
              </label>
            </div>
            <div>
              <label className="label">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setField("is_featured", e.target.checked)} /> Featured
              </label>
            </div>
          </div>

          {form.image_url ? (
            <div style={{marginTop:16}}>
              <img src={form.image_url} alt="" className="image-preview" />
            </div>
          ) : null}

          <div className="split-actions" style={{marginTop:16}}>
            <button className="btn btn-primary" disabled={busy} type="submit">{busy ? "Saving..." : form.id ? "Update Product" : "Create Product"}</button>
            {form.id ? <button className="btn btn-danger" type="button" onClick={() => deleteProduct(form.id)}>Delete Product</button> : null}
          </div>
        </form>
      </div>

      <div className="card" style={{marginTop:20}}>
        <div className="section-head">
          <div>
            <h2 style={{fontSize:34}}>Current Products</h2>
            <p>{products.length} total</p>
          </div>
          <input className="input" style={{maxWidth:300}} placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <div className="muted">{product.brand || product.slug}</div>
                  </td>
                  <td>{product.categories?.name || "—"}</td>
                  <td>£{Number(product.price_gbp || 0).toFixed(2)}</td>
                  <td>{product.stock_quantity}</td>
                  <td>{product.is_active ? "Active" : "Hidden"}{product.is_featured ? " • Featured" : ""}</td>
                  <td><button className="btn" type="button" onClick={() => editProduct(product)}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length ? <div className="empty">No products found.</div> : null}
        </div>
      </div>
    </>
  );
}
