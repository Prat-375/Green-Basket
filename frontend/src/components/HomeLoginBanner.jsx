import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomeLoginBanner() {
  const { isLoggedIn } = useAuth();
  const [visible, setVisible] = useState(true);

  if (isLoggedIn || !visible) return null;

  return (
    <div className="home-login-banner">
      <div className="home-login-banner-content">
        <div className="home-login-banner-text">
          <h3>Ready to start shopping?</h3>
          <p>
            Login to unlock prices, add items to your cart, and place your order.
          </p>
        </div>

        <div className="home-login-banner-actions">
          <Link to="/login" className="banner-login-btn">
            Login
          </Link>

          <button
            className="banner-close-btn"
            onClick={() => setVisible(false)}
            aria-label="Close banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeLoginBanner;