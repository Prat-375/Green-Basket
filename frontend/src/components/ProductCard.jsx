import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProductCard({ product, onAddToCart }) {
  const { isLoggedIn } = useAuth();

  return (
    <div className="card">
      <div className="emoji">{product.image}</div>
      <h3>{product.name}</h3>
      <p className="category-badge">{product.category}</p>

      {isLoggedIn ? (
        <>
          <p>
            €{product.price} / {product.unit}
          </p>

          <div className="card-actions">
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
            <Link to={`/shop/${product.id}`} className="secondary-btn link-btn">
              Details
            </Link>
          </div>
        </>
      ) : (
        <div className="guest-lock-box">
          <p className="guest-message">Login to view prices and place orders</p>
          <Link to="/login" className="secondary-btn link-btn">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductCard;