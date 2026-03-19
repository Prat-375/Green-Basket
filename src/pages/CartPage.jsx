import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <main className="page-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-box">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="hero-btn">
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <p className="cart-unit">
                    €{item.price} / {item.unit}
                  </p>

                  <div className="controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>

                <div className="cart-right">
                  <span className="cart-price">
                    €{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Total: €{cartTotal.toFixed(2)}</h3>
            <Link to="/checkout" className="checkout-btn link-btn">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartPage;