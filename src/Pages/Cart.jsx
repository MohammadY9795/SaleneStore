import React, { useState } from "react";
import "./Cart.css"; // Keep your existing CSS

const initialCartItems = [
  {
    id: "1",
    name: "Ha1o Alpha",
    variant: "100 ML",
    quantity: 1,
    price: 399,
    imageUrl:
      "//metaman.in/cdn/shop/files/PRA_0037_aab1f9d7-c272-4f5b-86fc-d41b25f279f3.jpg?crop=center&height=240&v=1758198583&width=240",
    link: "/products/alpha",
  },
  {
    id: "2",
    name: "Ha1o Date",
    variant: "100 ML",
    quantity: 2,
    price: 399,
    imageUrl:
      "//metaman.in/cdn/shop/files/SHR_0025_1.jpg?crop=center&height=240&v=1758287615&width=240",
    link: "/products/date",
  },
];

const CartItems = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart__empty">
        <h2>Your cart is empty</h2>
        <a href="/collections/all" className="btn btn--outline btn--primary">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="cart__items">
      <h1 className="cart__title">Your Cart</h1>
      <div className="cart__list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart__item">
            <div className="cart__item-image">
              <a href={item.link}>
                <img src={item.imageUrl} alt={item.name} />
              </a>
            </div>
            <div className="cart__item-details">
              <a href={item.link}>
                <h3>{item.name}</h3>
                {item.variant && <p>{item.variant}</p>}
              </a>
              <p className="cart__item-price">Rs. {item.price}</p>
              <div className="cart__item-quantity">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <button
                className="cart__item-remove"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart__summary">
        <p>
          Total: <strong>Rs. {totalPrice}</strong>
        </p>
        <a href="/checkout" className="btn btn--primary" style={{color: '#fff', border: '1px solid #fff'}}>
          Checkout
        </a>
      </div>
    </div>
  );
};

export default CartItems;
