import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>Green Basket</h1>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/cart">Cart ({cartCount})</NavLink>
            <NavLink to="/my-orders">My Orders</NavLink>
            <span className="nav-user">Hi, {user?.name}</span>
            <button className="nav-logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;