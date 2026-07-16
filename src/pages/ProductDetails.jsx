import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const sizes = ["XL", "X", "M", "S"];
  const colors = ["Black", "White", "Red", "Purple"];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await supabase.from("products").select("*").eq("id", id).single();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!product) return;
    addItem(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div style={{ padding: "80px", textAlign: "center" }}><p>Chargement...</p></div>;
  if (!product) return <div style={{ padding: "80px", textAlign: "center" }}><p>Produit non trouvé.</p><Link to="/shop">Retour à la boutique</Link></div>;

  return (
    <section className="single_product_details_area d-flex align-items-center">
      <div className="single_product_thumb clearfix">
        <div className="product_thumbnail_slides owl-carousel">
          <img src={product.image || "/img/product-img/product-1.jpg"} alt={product.name} />
          {product.hover_image && <img src={product.hover_image} alt={product.name} />}
        </div>
      </div>

      <div className="single_product_desc clearfix">
        <span>{product.brand}</span>
        <h2>{product.name}</h2>
        <p className="product-price">
          {product.old_price && <span className="old-price">${product.old_price.toFixed(2)}</span>} ${product.price.toFixed(2)}
        </p>
        <p className="product-desc">{product.description}</p>

        <form className="cart-form clearfix" onSubmit={handleAddToCart}>
          <div className="select-box d-flex mt-50 mb-30">
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="mr-5">
              {sizes.map((size) => (
                <option key={size} value={size}>Taille: {size}</option>
              ))}
            </select>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              {colors.map((color) => (
                <option key={color} value={color}>Couleur: {color}</option>
              ))}
            </select>
          </div>
          <div className="cart-fav-box d-flex align-items-center">
            <button type="submit" className="btn essence-btn">
              {added ? "Ajouté !" : "Ajouter au panier"}
            </button>
            <div className="product-favourite ml-4">
              <a href="#" className="favme fa fa-heart"></a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
