import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginBanner() {
  const { isLoggedIn } = useAuth();
  const [visible, setVisible] = useState(true);

  if (isLoggedIn || !visible) return null;

  return (
    <div className="shop-banner">
      <div className="shop-banner-icon">🔐</div>

      <div className="shop-banner-text">
        <h3>Unlock prices and ordering</h3>
        <p>
          Sign in to view product prices, add items to your cart, and place orders.
        </p>
      </div>

      <div className="shop-banner-actions">
        <Link to="/login" className="shop-banner-login-btn">
          Login
        </Link>

        <button
          type="button"
          className="shop-banner-close-btn"
          onClick={() => setVisible(false)}
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default LoginBanner;