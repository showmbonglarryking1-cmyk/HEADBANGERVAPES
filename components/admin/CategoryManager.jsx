"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { slugify } from "@/lib/utils";

const emptyForm = {
  id: "",
  name: "",
  slug: "",
  description: "",
  sort_order: 0
};

export default function CategoryManager({ initialCategories = [] }) {
  const supabase = createClient();
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  function setField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "name" && !prev.id ? { slug: slugify(value) } : {})
    }));
  }

  async function refresh() {
    const { data } = await supabase.from("categories").select("*").order("sort_order").order("name");
    setCategories(data || []);
  }

  function editCategory(category) {
    setForm({
      id: category.id,
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
      sort_order: category.sort_order || 0
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveCategory(e) {
    e.preventDefault();
    setBusy(true);
    const payload = {
      name: form.name,
      slug: slugify(form.slug || form.name),
      description: form.description || null,
      sort_order: Number(form.sort_order || 0)
    };
    let result;
    if (form.id) result = await supabase.from("categories").update(payload).eq("id", form.id);
    else result = await supabase.from("categories").insert(payload);

    if (result.error) setMsg(result.error.message);
    else {
      setMsg(form.id ? "Category updated." : "Category created.");
      setForm(emptyForm);
      await refresh();
    }
    setBusy(false);
  }

  async function deleteCategory(id) {
    if (!confirm("Delete this category? Products using it will lose the category link.")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) setMsg(error.message);
    else {
      setMsg("Category deleted.");
      if (form.id === id) setForm(emptyForm);
      await refresh();
    }
  }

  return (
    <>
      <div className="card">
        <div className="section-head">
          <div>
            <h2 style={{fontSize:34}}>{form.id ? "Edit Category" : "Add Category"}</h2>
            <p>Create new categories directly from admin.</p>
          </div>
        </div>
        {msg ? <div className="notice" style={{marginBottom:16}}>{msg}</div> : null}
        <form onSubmit={saveCategory}>
          <div className="form-grid">
            <div>
              <label className="label">Category name</label>
              <input className="input" value={form.name} onChange={(e) => setField("name", e.target.value)} required />
            </div>
            <div>
              <label className="label">Slug</label>
              <input className="input" value={form.slug} onChange={(e) => setField("slug", e.target.value)} required />
            </div>
            <div className="full">
              <label className="label">Description</label>
              <textarea className="textarea" value={form.description} onChange={(e) => setField("description", e.target.value)} />
            </div>
            <div>
              <label className="label">Sort order</label>
              <input className="input" type="number" value={form.sort_order} onChange={(e) => setField("sort_order", e.target.value)} />
            </div>
          </div>
          <div className="split-actions" style={{marginTop:16}}>
            <button className="btn btn-primary" disabled={busy}>{busy ? "Saving..." : form.id ? "Update Category" : "Create Category"}</button>
            {form.id ? <button className="btn btn-danger" type="button" onClick={() => deleteCategory(form.id)}>Delete Category</button> : null}
            <button className="btn" type="button" onClick={() => setForm(emptyForm)}>New Blank</button>
          </div>
        </form>
      </div>

      <div className="card" style={{marginTop:20}}>
        <h2 style={{fontSize:34, marginBottom:12}}>Current Categories</h2>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Sort</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <strong>{category.name}</strong>
                    <div className="muted">{category.description || ""}</div>
                  </td>
                  <td>{category.slug}</td>
                  <td>{category.sort_order}</td>
                  <td><button className="btn" type="button" onClick={() => editCategory(category)}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!categories.length ? <div className="empty">No categories yet.</div> : null}
        </div>
      </div>
    </>
  );
}
