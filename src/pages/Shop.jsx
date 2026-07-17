import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabase";

const KNOWN_CATEGORIES = [
  "Tournevis",
  "Clés à choc",
  "Perceuses",
  "Rivets",
  "Meulage",
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCat);
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
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0; // newest = default order from supabase
    });

  return (
    <>
      <Breadcrumb title="Boutique" />

      <section className="shop_grid_area section-padding-80">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-12 col-md-4 col-lg-3">
              <div className="shop_sidebar_area">
                {/* Categories */}
                <div className="widget catagory mb-50">
                  <h6 className="widget-title mb-30">Catégories</h6>
                  <div className="catagories-menu">
                    <ul className="menu-content">
                      <li>
                        <a href="#" onClick={(e) => { e.preventDefault(); setCategory("all"); setSearchParams({}); }}
                          style={{ fontWeight: category === "all" ? "700" : "400" }}>
                          Tous les produits
                        </a>
                      </li>
                      {categories.map((cat) => (
                        <li key={cat}>
                          <a href="#" onClick={(e) => { e.preventDefault(); setCategory(cat); setSearchParams({ cat }); }}
                            style={{ fontWeight: category === cat ? "700" : "400" }}>
                            {cat}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Info widget */}
                <div className="widget mb-50" style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
                  <h6 className="widget-title mb-15">POWER Tools GmbH</h6>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
                    Tournevis, perceuses, clés à choc, riveteurs et meuleuses haute performance pour professionnels.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="col-12 col-md-8 col-lg-9">
              <div className="shop_grid_product_area">
                <div className="row">
                  <div className="col-12">
                    <div className="product-topbar d-flex align-items-center justify-content-between">
                      <div className="total-products">
                        <p><span>{filtered.length}</span> produits trouvés</p>
                      </div>
                      <div className="product-sorting d-flex">
                        <p>Trier par :</p>
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                          <option value="newest">Plus récents</option>
                          <option value="price-asc">Prix : € - €€</option>
                          <option value="price-desc">Prix : €€ - €</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {loading ? (
                    <div className="col-12 text-center" style={{ padding: "40px" }}>
                      <p style={{ color: "#888" }}>Chargement des produits...</p>
                    </div>
                  ) : filtered.length === 0 ? (
                    <div className="col-12 text-center" style={{ padding: "40px" }}>
                      <p style={{ color: "#888" }}>Aucun produit trouvé. Ajoutez des produits depuis l'<a href="/admin">admin</a>.</p>
                    </div>
                  ) : (
                    filtered.map((product) => (
                      <div className="col-12 col-sm-6 col-lg-4" key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
