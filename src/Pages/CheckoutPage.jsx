import React, { useState } from "react";
import "./CheckoutPage.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
    shippingMethod: "standard",
    paymentMethod: "card",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const shippingCosts = {
    standard: 0,
    express: 100,
    overnight: 250,
  };

  const subtotal = getTotalPrice();
  const shippingCost = shippingCosts[formData.shippingMethod] || 0;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shippingCost + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.fullName || !formData.address || !formData.city || !formData.state || !formData.pinCode) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call - in real app, you'd save to backend/Firestore
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        userId: user.id,
        items: cart,
        subtotal,
        tax,
        shippingCost,
        total,
        shippingDetails: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
        },
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Save order to localStorage (demo - in real app, use Firebase/backend)
      const existingOrders = JSON.parse(localStorage.getItem("salene_orders") || "[]");
      existingOrders.push(order);
      localStorage.setItem("salene_orders", JSON.stringify(existingOrders));

      // Also save to user's order history
      const userOrders = JSON.parse(localStorage.getItem(`user_orders_${user.id}`) || "[]");
      userOrders.push(order);
      localStorage.setItem(`user_orders_${user.id}`, JSON.stringify(userOrders));

      setOrderPlaced(true);
      clearCart();

      // Redirect to order confirmation after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2>Your cart is empty</h2>
        <p>Add items to your cart before checking out.</p>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", color: "#d4af37" }}>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="checkout__container">
      <div className="checkout__content">
        <h1>Checkout</h1>

        <div className="checkout__grid">
          {/* Left: Shipping & Payment Form */}
          <div className="checkout__form">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <fieldset>
                <legend>Shipping Address</legend>
                <div className="form__group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form__group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form__group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form__group">
                  <label htmlFor="address">Address *</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form__group">
                  <label htmlFor="landmark">Landmark (optional)</label>
                  <input
                    id="landmark"
                    name="landmark"
                    type="text"
                    placeholder="e.g. Near Central Park"
                    value={formData.landmark}
                    onChange={handleChange}
                  />
                </div>

                <div className="form__row">
                  <div className="form__group">
                    <label htmlFor="city">City *</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="state">State *</label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="pinCode">Pin Code *</label>
                    <input
                      id="pinCode"
                      name="pinCode"
                      type="text"
                      value={formData.pinCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </fieldset>

              {/* Shipping Method */}
              <fieldset>
                <legend>Shipping Method</legend>
                <div className="form__group">
                  <label>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === "standard"}
                      onChange={handleChange}
                    />
                    Standard Shipping (FREE) - 5-7 business days
                  </label>
                </div>
                <div className="form__group">
                  <label>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === "express"}
                      onChange={handleChange}
                    />
                    Express Shipping (+Rs. 100) - 2-3 business days
                  </label>
                </div>
                <div className="form__group">
                  <label>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="overnight"
                      checked={formData.shippingMethod === "overnight"}
                      onChange={handleChange}
                    />
                    Overnight Shipping (+Rs. 250) - Next business day
                  </label>
                </div>
              </fieldset>

              {/* Payment Method */}
              <fieldset>
                <legend>Payment Method</legend>
                <div className="form__group">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                    />
                    Credit/Debit Card
                  </label>
                </div>
                <div className="form__group">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                    />
                    UPI (Demo)
                  </label>
                </div>
                {/* <div className="form__group">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                    />
                    Cash on Delivery
                  </label>
                </div> */}
              </fieldset>

              {error && <div style={{ color: "#ff6b6b", marginBottom: "15px" }}>{error}</div>}

              <button
                type="submit"
                className="btn btn--primary"
                disabled={loading}
                style={{ width: "100%", padding: "12px", marginTop: "20px" }}
              >
                {loading ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="checkout__summary">
            <h2>Order Summary</h2>
            <div className="summary__items">
              {cart.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="summary__item">
                  <div className="summary__item-info">
                    <p className="summary__item-name">{item.name}</p>
                    <p className="summary__item-variant">{item.variant}</p>
                  </div>
                  <p className="summary__item-qty">x{item.quantity}</p>
                  <p className="summary__item-price">Rs. {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="summary__divider" />

            <div className="summary__totals">
              <div className="summary__row">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="summary__row">
                <span>Shipping</span>
                <span>Rs. {shippingCost}</span>
              </div>
              <div className="summary__row">
                <span>Tax (18% GST)</span>
                <span>Rs. {tax}</span>
              </div>
              <div className="summary__row summary__total">
                <span>Total</span>
                <span style={{ color: "#d4af37", fontWeight: "bold", fontSize: "18px" }}>Rs. {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
