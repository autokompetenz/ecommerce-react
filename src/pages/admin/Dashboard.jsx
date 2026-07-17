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
    (p) => (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
      (p.brand && p.brand.toLowerCase().includes(search.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="admin-header-row">
        <h1>Produits ({products.length})</h1>
        <Link to="/admin/add" className="btn btn-primary admin-add-btn">
          <i className="fa-solid fa-plus"></i> Ajouter
        </Link>
      </div>

      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="admin-search-input"
      />

      {loading ? (
        <p className="admin-loading">Chargement...</p>
      ) : filtered.length === 0 ? (
        <p className="admin-loading">Aucun produit trouvé.</p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Marque</th>
                  <th>Catégorie</th>
                  <th className="text-right">Prix</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image || "/img/product-img/product-1.jpg"} alt="" className="admin-table-img" />
                    </td>
                    <td className="font-medium">{product.name}</td>
                    <td className="text-muted">{product.brand}</td>
                    <td className="text-muted">{product.category || "-"}</td>
                    <td className="text-right font-semibold">
                      {product.old_price && <span className="old-price">${product.old_price}</span>}
                      ${product.price}
                    </td>
                    <td className="text-center">
                      <div className="admin-actions">
                        <Link to={`/admin/edit/${product.id}`} className="admin-action-edit">
                          <i className="fa-solid fa-pen"></i>
                        </Link>
                        <button onClick={() => handleDelete(product.id)} disabled={deleting === product.id} className="admin-action-delete">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="admin-product-cards">
            {filtered.map((product) => (
              <div key={product.id} className="admin-product-card">
                <img src={product.image || "/img/product-img/product-1.jpg"} alt="" className="admin-product-card-img" />
                <div className="admin-product-card-info">
                  <h4>{product.name}</h4>
                  <p className="text-muted">{product.brand} — {product.category || "-"}</p>
                  <p className="admin-product-card-price">
                    {product.old_price && <span className="old-price">${product.old_price}</span>}
                    ${product.price}
                  </p>
                </div>
                <div className="admin-product-card-actions">
                  <Link to={`/admin/edit/${product.id}`} className="admin-action-edit">
                    <i className="fa-solid fa-pen"></i>
                  </Link>
                  <button onClick={() => handleDelete(product.id)} disabled={deleting === product.id} className="admin-action-delete">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
