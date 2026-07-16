import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false }).limit(4);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Area */}
      <section className="welcome_area bg-img background-overlay" style={{ backgroundImage: "url(/img/bg-img/bg-1.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="hero-content">
                <h6>POWER Tools</h6>
                <h2>Outils de Coupe Industriels</h2>
                <a href="/shop" className="btn essence-btn">Voir le catalogue</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <div className="top_catagory_area section-padding-80 clearfix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-4">
              <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ backgroundImage: "url(/img/bg-img/bg-2.jpg)" }}>
                <div className="catagory-content"><a href="/shop">Outils de Coupe</a></div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ backgroundImage: "url(/img/bg-img/bg-3.jpg)" }}>
                <div className="catagory-content"><a href="/shop">Machines</a></div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ backgroundImage: "url(/img/bg-img/bg-4.jpg)" }}>
                <div className="catagory-content"><a href="/shop">Accessoires</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Area */}
      <div className="cta-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cta-content bg-img background-overlay" style={{ backgroundImage: "url(/img/bg-img/bg-5.jpg)" }}>
                <div className="h-100 d-flex align-items-center justify-content-end">
                  <div className="cta--text">
                    <h6>Precision</h6>
                    <h2>Haute Performance</h2>
                    <a href="/shop" className="btn essence-btn">Découvrir</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <section className="new_arrivals_area section-padding-80 clearfix">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading text-center">
                <h2>Produits Populaires</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="popular-products-slides owl-carousel">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "40px", width: "100%" }}>
                    <p style={{ color: "#888" }}>Ajoutez des produits depuis l'<a href="/admin">admin</a> pour les afficher ici.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <div className="brands-area d-flex align-items-center justify-content-between">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div className="single-brands-logo" key={n}>
            <img src={`/img/core-img/brand${n}.png`} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}
