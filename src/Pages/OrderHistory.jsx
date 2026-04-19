import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./OrderHistory.css";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch orders for current user from localStorage
    const userOrders = JSON.parse(localStorage.getItem(`user_orders_${user.id}`) || "[]");
    setOrders(userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setLoading(false);
  }, [user.id]);

  if (loading) {
    return <div className="order-history__loading">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="order-history__empty">
        <div className="order-history__empty-icon">
          <i className="bi bi-receipt" aria-hidden="true"></i>
        </div>
        <h2>No orders yet</h2>
        <p>You haven't placed any orders yet. Your fragrance journey starts here!</p>
        <div className="order-history__empty-actions">
          <Link to="/shop" className="btn btn--primary">
            <i className="bi bi-shop me-2" aria-hidden="true"></i>
            Start Shopping
          </Link>
        </div>
        <div className="order-history__empty-tips">
          <h3>Why choose SALENE?</h3>
          <div className="order-history__empty-features">
            <div className="feature">
              <i className="bi bi-star-fill" aria-hidden="true"></i>
              <span>Premium Quality</span>
            </div>
            <div className="feature">
              <i className="bi bi-truck" aria-hidden="true"></i>
              <span>Fast Delivery</span>
            </div>
            <div className="feature">
              <i className="bi bi-shield-check" aria-hidden="true"></i>
              <span>Authentic Products</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history__container">
      <h1>Order History</h1>
      <div className="order-history__list">
        {orders.map((order) => (
          <div key={order.id} className="order-history__card">
            <div className="order-history__header">
              <div>
                <h3>Order #{order.id}</h3>
                <p className="order-history__date">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="order-history__status">
                <span className={`status-badge status-${order.status}`}>{order.status}</span>
                <p className="order-history__total">Rs. {order.total}</p>
              </div>
            </div>

            <div className="order-history__items">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="order-history__item">
                  <img src={item.image} alt={item.name} className="order-history__item-image" />
                  <div className="order-history__item-info">
                    <p className="order-history__item-name">{item.name}</p>
                    <p className="order-history__item-variant">{item.variant}</p>
                    <p className="order-history__item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="order-history__item-price">Rs. {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="order-history__details">
              <div className="order-history__detail-section">
                <h4>Shipping Address</h4>
                <p>
                  {order.shippingDetails.fullName}<br />
                  {order.shippingDetails.address}<br />
                  {order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zipCode}<br />
                  {order.shippingDetails.phone}
                </p>
              </div>

              <div className="order-history__detail-section">
                <h4>Shipping Method</h4>
                <p className="capitalize">{order.shippingMethod}</p>
              </div>

              <div className="order-history__detail-section">
                <h4>Payment Method</h4>
                <p className="capitalize">{order.paymentMethod}</p>
              </div>
            </div>

            <div className="order-history__summary">
              <div className="order-history__summary-row">
                <span>Subtotal</span>
                <span>Rs. {order.subtotal}</span>
              </div>
              <div className="order-history__summary-row">
                <span>Shipping</span>
                <span>Rs. {order.shippingCost}</span>
              </div>
              <div className="order-history__summary-row">
                <span>Tax</span>
                <span>Rs. {order.tax}</span>
              </div>
              <div className="order-history__summary-row order-history__summary-total">
                <span>Total</span>
                <span>Rs. {order.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
