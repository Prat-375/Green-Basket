import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <h1>Green Basket</h1>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;