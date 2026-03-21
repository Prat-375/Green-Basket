import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not load orders.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(orderId, newStatus) {
    try {
      setUpdatingId(orderId);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: data.order.status } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Could not update order status.");
    } finally {
      setUpdatingId("");
    }
  }

  return (
    <PageWrapper>
      <main className="page-container">
        <div className="page-header">
          <h2>Admin Orders</h2>
          <p>View and manage all customer orders</p>
        </div>

        {loading ? (
          <div className="empty-box">
            <p>Loading orders...</p>
          </div>
        ) : error ? (
          <div className="empty-box">
            <p>{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-box">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card-top">
                  <h3>{order.customerInfo.fullName}</h3>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </div>

                <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                <p><strong>Payment:</strong> {order.customerInfo.paymentMethod}</p>
                <p><strong>Total:</strong> €{order.total.toFixed(2)}</p>
                <p><strong>Address:</strong> {order.customerInfo.address}</p>

                <div className="order-items-block">
                  <strong>Items:</strong>
                  <ul>
                    {order.orderItems.map((item, index) => (
                      <li key={index}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="status-update-box">
                  <label htmlFor={`status-${order._id}`}>Update Status</label>
                  <select
                    id={`status-${order._id}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    disabled={updatingId === order._id}
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
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

export default AdminOrders;