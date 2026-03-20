import { Link } from "react-router-dom";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import PageWrapper from "../components/PageWrapper";

function OrderSuccess() {
  const savedOrder = sessionStorage.getItem("latest-order");
  const order = savedOrder ? JSON.parse(savedOrder) : null;

  useEffect(() => {
    const duration = 1800;
    const end = Date.now() + duration;

    const colors = ["#2e7d32", "#66bb6a", "#a5d6a7", "#ffffff"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  if (!order) {
    return (
      <PageWrapper>
        <main className="page-container">
          <div className="empty-box">
            <h2>No recent order found</h2>
            <Link to="/shop" className="hero-btn">
              Go to Shop
            </Link>
          </div>
        </main>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <main className="page-container">
        <div className="success-box">
          <div className="success-icon">🎉</div>
          <h2>Order Placed Successfully</h2>
          <p>Your vegetables are on the way.</p>

          <div className="customer-box">
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> {order.customerInfo.fullName}</p>
            <p><strong>Address:</strong> {order.customerInfo.address}</p>
            <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
            <p><strong>Payment:</strong> {order.customerInfo.paymentMethod}</p>
          </div>

          <div className="customer-box">
            <h3>Order Items</h3>
            {order.orderItems.map((item) => (
              <p key={item.id}>
                {item.name} x {item.quantity} — €{(item.price * item.quantity).toFixed(2)}
              </p>
            ))}
            <hr />
            <p><strong>Total:</strong> €{order.total.toFixed(2)}</p>
          </div>

          <div className="success-actions">
            <Link to="/shop" className="success-btn">
              🛒 Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}

export default OrderSuccess;