import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("id, name, brand, price, old_price, image, category, badge, created_at")
      .order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Supprimer "${name}" ? Cette action est irréversible.`)) return;
    setDeleting(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const filtered = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="admin-header-row">
        <h1>Produits ({products.length})</h1>
        <Link to="/admin/add" className="btn btn-primary admin-add-btn">
          <i className="fa-solid fa-plus"></i> Ajouter
        </Link>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom, marque, catégorie..."
          className="admin-input"
          style={{ maxWidth: 400 }}
        />
      </div>

      {loading ? (
        <p className="admin-loading">Chargement...</p>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <p>{search ? "Aucun produit ne correspond à votre recherche." : "Aucun produit."}</p>
          <Link to="/admin/add" className="btn btn-primary" style={{ marginTop: 12 }}>
            <i className="fa-solid fa-plus"></i> Ajouter un produit
          </Link>
        </div>
      ) : (
        <div className="admin-products-table-wrap">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}></th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Badge</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.image || "/img/product-img/product-1.jpg"}
                      alt=""
                      style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6 }}
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                    {p.brand && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.brand}</div>}
                  </td>
                  <td style={{ fontSize: 13, color: "var(--text-muted)" }}>{p.category || "—"}</td>
                  <td>
                    <span style={{ fontWeight: 600, fontFamily: "var(--font-mono)", fontSize: 14 }}>
                      {Number(p.price).toFixed(2)} €
                    </span>
                    {p.old_price > 0 && (
                      <span style={{ marginLeft: 6, fontSize: 12, color: "var(--text-muted)", textDecoration: "line-through" }}>
                        {Number(p.old_price).toFixed(2)} €
                      </span>
                    )}
                  </td>
                  <td>
                    {p.badge && (
                      <span style={{
                        background: p.badge === "New" ? "rgba(59,130,246,0.1)" : "rgba(239,68,68,0.1)",
                        color: p.badge === "New" ? "#3b82f6" : "#ef4444",
                        padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                      }}>
                        {p.badge}
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => navigate(`/admin/edit/${p.id}`)}
                        className="btn btn-sm btn-outline"
                      >
                        <i className="fa-solid fa-pen"></i> Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleting === p.id}
                        className="btn btn-sm btn-danger"
                      >
                        {deleting === p.id ? "..." : <><i className="fa-solid fa-trash"></i> Supprimer</>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
