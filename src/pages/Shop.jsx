import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabase";

const KNOWN_CATEGORIES = ["Tournevis", "Clés à choc", "Perceuses", "Rivets", "Meulage"];
const MATERIALS = ["Acier rapide (HSS)", "Carbure de tungstène", "Acier au carbone", "Alliage spécial"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCat);
  const [material, setMaterial] = useState("all");
  const [categories, setCategories] = useState(KNOWN_CATEGORIES);
  const [sort, setSort] = useState("newest");

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error && data?.length) {
      setProducts(data);
      const dbCats = [...new Set(data.map((p) => p.category).filter(Boolean))];
      setCategories([...new Set([...KNOWN_CATEGORIES, ...dbCats])]);
    }
    setLoading(false);
  };

  const filtered = products
    .filter((p) => category === "all" || p.category === category)
    .filter((p) => material === "all" || p.material === material)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Breadcrumb title="Boutique" links={[{ label: "Boutique" }]} />

      <div className="section">
        <div className="container">
          <div className="shop-layout">
            {/* Sidebar */}
            <aside className="shop-sidebar">
              <div className="sidebar-widget">
                <h6>Catégories</h6>
                <ul className="sidebar-links">
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCategory("all"); setSearchParams({}); }}
                      className={category === "all" ? "active" : ""}>
                      Tous les produits
                    </a>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat}>
                      <a href="#" onClick={(e) => { e.preventDefault(); setCategory(cat); setSearchParams({ cat }); }}
                        className={category === cat ? "active" : ""}>
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-widget">
                <h6>Matière</h6>
                <ul className="sidebar-links">
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setMaterial("all"); }}
                      className={material === "all" ? "active" : ""}>
                      Toutes
                    </a>
                  </li>
                  {MATERIALS.map((mat) => (
                    <li key={mat}>
                      <a href="#" onClick={(e) => { e.preventDefault(); setMaterial(mat); }}
                        className={material === mat ? "active" : ""}>
                        {mat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-widget" style={{ background: "var(--bg-alt)", padding: 16, borderLeft: "3px solid var(--cut-amber)" }}>
                <h6>POWER Tools GmbH</h6>
                <p style={{ fontSize: 12, color: "var(--text-sec)", lineHeight: 1.6, margin: 0 }}>
                  Outils de coupe haute performance pour broyage industriel et agroalimentaire.
                </p>
              </div>
            </aside>

            {/* Products */}
            <div>
              <div className="shop-topbar">
                <p>{filtered.length} produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}</p>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Plus récents</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                </select>
              </div>

              {loading ? (
                <div className="empty-state"><p>Chargement des produits...</p></div>
              ) : filtered.length === 0 ? (
                <div className="empty-state">
                  <i className="fa-solid fa-box-open"></i>
                  <p>Aucun produit trouvé.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
