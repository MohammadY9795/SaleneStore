import React, { useState } from "react";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="cart__item">
      <div className="cart__item__image">
        <a href={item.link}>
          <img src={item.image} alt={item.title} />
        </a>
      </div>
      <div className="cart__item__content">
        <h4 className="cart__item__title">{item.title}</h4>
        <p className="cart__item__variant">{item.variant}</p>
        <p className="cart__price">
          <ins>Rs. {item.price}</ins> <del>Rs. {item.oldPrice}</del>
        </p>
        <div className="cart__quantity-counter">
          <button onClick={decrease}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={increase}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
