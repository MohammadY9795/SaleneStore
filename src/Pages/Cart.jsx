import React from "react";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartItems = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart__empty">
        <h2>Your cart is empty</h2>
        <Link to="/shop" className="btn btn--outline btn--primary">
          Continue Shopping
        </Link>
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
                <span>{item.quantity}</span>
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
