import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginBanner() {
  const { isLoggedIn } = useAuth();
  const [visible, setVisible] = useState(true);

  if (isLoggedIn || !visible) return null;

  return (
    <div className="login-banner">
      <div className="login-banner-content">
        <span>
          🔐 Login to view prices and place orders
        </span>

        <div className="banner-actions">
          <Link to="/login" className="banner-login-btn">
            Login
          </Link>

          <button
            className="banner-close-btn"
            onClick={() => setVisible(false)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginBanner;