import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [token]);

  return (
    <PageWrapper>
      <main className="page-container">
        <h2>My Orders</h2>

        {loading ? (
          <div className="empty-box"><p>Loading orders...</p></div>
        ) : orders.length === 0 ? (
          <div className="empty-box"><p>No orders found.</p></div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card-top">
                  <h3>Order</h3>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </div>

                <p><strong>Total:</strong> €{order.total.toFixed(2)}</p>

                <div className="order-items-block">
                  <strong>Items:</strong>
                  <ul>
                    {order.orderItems.map((item, index) => (
                      <li key={index}>{item.name} x {item.quantity}</li>
                    ))}
                  </ul>
                </div>

                <p className="order-date">
                  Ordered on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </PageWrapper>
  );
}

export default MyOrders;