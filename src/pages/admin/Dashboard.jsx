import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    setDeleting(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "24px", color: "#333" }}>Produits ({products.length})</h1>
        <Link to="/admin/add" style={{ padding: "10px 20px", background: "#333", color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "14px" }}>
          <i className="fa fa-plus" style={{ marginRight: "6px" }}></i>Ajouter
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", boxSizing: "border-box" }}
      />

      {loading ? (
        <p style={{ color: "#888" }}>Chargement...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: "#888" }}>Aucun produit trouvé.</p>
      ) : (
        <div style={{ background: "#fff", borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e5e5" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f8f9fa", borderBottom: "1px solid #e5e5e5" }}>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Image</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Nom</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Marque</th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Catégorie</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Prix</th>
                <th style={{ padding: "12px 16px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <img src={product.image || "/img/product-img/product-1.jpg"} alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: "500" }}>{product.name}</td>
                  <td style={{ padding: "12px 16px", color: "#666" }}>{product.brand}</td>
                  <td style={{ padding: "12px 16px", color: "#666" }}>{product.category || "-"}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600" }}>
                    {product.old_price && <span style={{ textDecoration: "line-through", color: "#999", marginRight: "6px" }}>${product.old_price}</span>}
                    ${product.price}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <Link to={`/admin/edit/${product.id}`} style={{ marginRight: "12px", color: "#3498db", textDecoration: "none" }}>
                      <i className="fa fa-pencil"></i>
                    </Link>
                    <button onClick={() => handleDelete(product.id)} disabled={deleting === product.id} style={{ background: "none", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: "14px" }}>
                      <i className="fa fa-trash"></i>
                    </button>
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
