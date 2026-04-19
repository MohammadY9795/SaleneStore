import React from "react";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartItems = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart__empty">
        <div className="cart__empty-icon">
          <i className="bi bi-cart-x" aria-hidden="true"></i>
        </div>
        <h2>Your cart is feeling lonely</h2>
        <p>Looks like you haven't added any fragrances yet. Discover your signature scent!</p>
        <div className="cart__empty-actions">
          <Link to="/shop" className="btn btn--primary">
            <i className="bi bi-shop me-2" aria-hidden="true"></i>
            Start Shopping
          </Link>
        </div>
        <div className="cart__empty-suggestions">
          <p className="cart__empty-suggestions-title">Popular fragrances:</p>
          <div className="cart__empty-suggestions-list">
            <Link to="/product/ha1o-alpha" className="cart__empty-suggestion">
              <img src="https://metaman.in/cdn/shop/files/4_ab6dd5ea-6af8-422e-9e82-04b29e944609.png?v=1758198583&width=100" alt="Ha1o Alpha" />
              <span>Ha1o Alpha</span>
            </Link>
            <Link to="/product/ha1o-date" className="cart__empty-suggestion">
              <img src="https://metaman.in/cdn/shop/files/SHR_0025_1.jpg?v=1758287615&width=100" alt="Ha1o Date" />
              <span>Ha1o Date</span>
            </Link>
            <Link to="/product/ha1o-day" className="cart__empty-suggestion">
              <img src="https://metaman.in/cdn/shop/files/PRA_0538_0920a365-e3bd-47da-87dd-089ebfabd5fd.jpg?v=1724823008&width=100" alt="Ha1o Day" />
              <span>Ha1o Day</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart__items">
      <h1 className="cart__title">Your Cart</h1>
      <div className="cart__list">
        {cart.map((item) => (
          <div key={`${item.id}-${item.variant}`} className="cart__item">
            <div className="cart__item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart__item-details">
              <h3>{item.name}</h3>
              {item.variant && <p>{item.variant}</p>}
              <p className="cart__item-price">Rs. {item.price}</p>
              <div className="cart__item-quantity">
                <button onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}>-</button>
                <span className="cart__item-quantity-number">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}>+</button>
              </div>
              <button
                className="cart__item-remove"
                onClick={() => removeFromCart(item.id, item.variant)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart__summary">
        <p>
          Total: <strong>Rs. {getTotalPrice()}</strong>
        </p>
        <Link to="/checkout" className="btn btn--primary" style={{color: '#fff', border: '1px solid #fff'}}>
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartItems;
