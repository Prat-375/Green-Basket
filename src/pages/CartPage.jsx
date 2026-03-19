import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PageWrapper from "../components/PageWrapper";

function CartPage() {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <PageWrapper>
      <main className="page-container">
        <div className="page-header">
          <h2>Your Cart</h2>
          {cartItems.length > 0 && <p>{totalItems} item(s) in your cart</p>}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-box fancy-empty">
            <div className="empty-icon">🛒</div>

            <h3>Your basket is waiting...</h3>

            <p>
              Looks like you haven’t added anything yet.  
              Let’s fill it with some fresh vegetables 🥦
            </p>

            <Link to="/shop" className="hero-btn">
              🥕 Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-page">
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-left">
                    <div className="cart-item-emoji">{item.image}</div>
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
              <h3>Order Summary</h3>
              <p>Total Items: {totalItems}</p>
              <h2>€{cartTotal.toFixed(2)}</h2>

              <Link to="/checkout" className="checkout-btn link-btn">
                Proceed to Checkout
              </Link>

              <Link to="/shop" className="secondary-btn link-btn">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </main>
    </PageWrapper>
  );
}

export default CartPage;