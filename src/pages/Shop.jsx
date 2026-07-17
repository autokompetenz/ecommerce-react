import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import { supabase } from "../lib/supabase";

const CATEGORIES = ["Tournevis", "Clés à choc", "Perceuses", "Rivets", "Meulage"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("cat") || "all");
  const [searchQuery] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterSupplier, setFilterSupplier] = useState(true);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterOrigin, setFilterOrigin] = useState(false);
  const [filterShipping, setFilterShipping] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data?.length) {
      setProducts(data);
    }
    setLoading(false);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (minPrice !== "") {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== "") {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (filterSupplier) {
      result = result.filter(
        (p) =>
          (p.supplier && p.supplier.toLowerCase().includes("power")) ||
          (p.brand && p.brand.toLowerCase().includes("power"))
      );
    }

    if (filterVerified) {
      result = result.filter((p) => p.badge === "Verified" || p.verified === true);
    }

    if (filterOrigin) {
      result = result.filter(
        (p) =>
          (p.origin && p.origin.toLowerCase().includes("allemagne")) ||
          (p.country && p.country.toLowerCase().includes("allemagne"))
      );
    }

    if (filterShipping) {
      result = result.filter(
        (p) =>
          p.fast_shipping === true ||
          (p.shipping_info && p.shipping_info.toLowerCase().includes("24h"))
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "top-rated":
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, minPrice, maxPrice, filterSupplier, filterVerified, filterOrigin, filterShipping, sort]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setFilterSupplier(false);
    setFilterVerified(false);
    setFilterOrigin(false);
    setFilterShipping(false);
    setSort("newest");
    setSearchParams({});
  };

  return (
    <>
      <Breadcrumb title="Boutique" links={[{ label: "Boutique" }]} />

      <div className="section">
        <div className="container">
          {/* Mobile Filter Toggle */}
          <button className="shop-filter-toggle" onClick={() => setFilterOpen(true)}>
            <i className="fa-solid fa-sliders"></i> Filtres
          </button>

          {/* Mobile Filter Overlay */}
          <div className={`shop-filter-overlay ${filterOpen ? "active" : ""}`} onClick={() => setFilterOpen(false)} />

          <div className="shop-layout">
            <aside className={`shop-sidebar ${filterOpen ? "active" : ""}`}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h6 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700 }}>Filtres</h6>
                <button className="shop-sidebar-close" onClick={() => setFilterOpen(false)} style={{ border: "none", background: "none", fontSize: 18, cursor: "pointer", color: "var(--text-sec)" }}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="sidebar-widget">
                <h6>Catégorie</h6>
                <div className="sidebar-filter-group">
                  <label className="filter-radio">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                    />
                    <span>Tous les produits</span>
                  </label>
                  {CATEGORIES.map((cat) => (
                    <label className="filter-radio" key={cat}>
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-widget">
                <h6>Fourchette de prix</h6>
                <div className="price-range-inputs">
                  <input
                    type="number"
                    placeholder="Min €"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span>—</span>
                  <input
                    type="number"
                    placeholder="Max €"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="sidebar-widget">
                <h6>Fournisseur</h6>
                <div className="sidebar-filter-group">
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterSupplier}
                      onChange={(e) => setFilterSupplier(e.target.checked)}
                    />
                    <span>POWER Tools</span>
                  </label>
                </div>
              </div>

              <div className="sidebar-widget">
                <h6>Vérification</h6>
                <div className="sidebar-filter-group">
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterVerified}
                      onChange={(e) => setFilterVerified(e.target.checked)}
                    />
                    <span>Fournisseur vérifié</span>
                  </label>
                </div>
              </div>

              <div className="sidebar-widget">
                <h6>Origine</h6>
                <div className="sidebar-filter-group">
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterOrigin}
                      onChange={(e) => setFilterOrigin(e.target.checked)}
                    />
                    <span>Allemagne</span>
                  </label>
                </div>
              </div>

              <div className="sidebar-widget">
                <h6>Livraison</h6>
                <div className="sidebar-filter-group">
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterShipping}
                      onChange={(e) => setFilterShipping(e.target.checked)}
                    />
                    <span>Expédié sous 24h</span>
                  </label>
                </div>
              </div>

              <div className="sidebar-actions">
                <button
                  className="btn btn-orange"
                  onClick={() => setFilterOpen(false)}
                >
                  Appliquer
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => { clearFilters(); setFilterOpen(false); }}
                >
                  Effacer
                </button>
              </div>
            </aside>

            <div className="shop-main">
              <div className="shop-topbar">
                <p className="shop-result-count">
                  {filtered.length} produit{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
                </p>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="shop-sort-select">
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="newest">Nouveautés</option>
                  <option value="top-rated">Mieux notés</option>
                </select>
              </div>

              {loading ? (
                <div className="empty-state">
                  <p>Chargement des produits...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="empty-state">
                  <i className="fa-solid fa-box-open"></i>
                  <p>Aucun produit ne correspond à vos filtres.</p>
                  <button className="btn btn-orange" onClick={clearFilters}>
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div className="product-grid">
                  {filtered.map((product, i) => (
                    <ScrollReveal key={product.id} direction="up" delay={i * 50} inline>
                      <ProductCard product={product} />
                    </ScrollReveal>
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
