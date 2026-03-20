import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PageWrapper from "../components/PageWrapper";

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number.";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
  e.preventDefault();

  if (cartItems.length === 0) return;

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const orderData = {
    customerInfo: formData,
    orderItems: cartItems,
    total: cartTotal,
  };

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    // store response from backend
    sessionStorage.setItem("latest-order", JSON.stringify(data.order));

    clearCart();
    navigate("/success");
  } catch (error) {
    console.error(error);
    alert("Order failed. Try again.");
  }
}

  return (
    <PageWrapper>
      <main className="page-container">
        <h2>Checkout</h2>

        {cartItems.length === 0 ? (
          <div className="empty-box">
            <p>Your cart is empty.</p>
            <Link to="/shop" className="hero-btn">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="checkout-layout">
            <form className="page-form checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="form-error">{errors.fullName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                />
                {errors.address && <p className="form-error">{errors.address}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Card on Delivery">Card on Delivery</option>
                  <option value="Online Payment">Online Payment</option>
                </select>
              </div>

              <button type="submit" className="checkout-btn">
                Place Order
              </button>
            </form>

            <aside className="cart-summary">
              <h3>Order Summary</h3>

              <div className="summary-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="summary-item">
                <strong>Total</strong>
                <strong>€{cartTotal.toFixed(2)}</strong>
              </div>
            </aside>
          </div>
        )}
      </main>
    </PageWrapper>
  );
}

export default CheckoutPage;