import Link from "next/link";

const links = [
  ["/admin", "Overview"],
  ["/admin/products", "Products"],
  ["/admin/categories", "Categories"],
  ["/admin/settings", "Settings"]
];

export default function AdminNav({ current = "/admin" }) {
  return (
    <div className="tabs" style={{marginBottom:18}}>
      {links.map(([href, label]) => (
        <Link key={href} href={href} className={`tab ${current === href ? "active" : ""}`}>
          {label}
        </Link>
      ))}
    </div>
  );
}
