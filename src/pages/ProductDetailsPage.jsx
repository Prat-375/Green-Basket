import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetailsPage() {
  const { id } = useParams();
  const { products, addToCart } = useCart();

  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <main className="page-container">
        <div className="empty-box">
          <h2>Product not found</h2>
          <Link to="/shop" className="hero-btn">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="details-page">
        <div className="details-image-box">
          <div className="details-emoji">{product.image}</div>
        </div>

        <div className="details-content">
          <p className="category-badge">{product.category}</p>
          <h2>{product.name}</h2>
          <p className="details-price">
            €{product.price} / {product.unit}
          </p>
          <p className="details-description">{product.description}</p>

          <div className="details-actions">
            <button className="checkout-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>

            <Link to="/shop" className="secondary-btn link-btn">
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailsPage;