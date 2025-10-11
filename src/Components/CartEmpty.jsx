import React from "react";

const CartEmpty = () => {
  return (
    <div className="cart__empty">
      <h1 className="cart__title">Cart</h1>
      <p>Your Cart is Empty</p>
      <a href="/collections/all" className="btn btn--outline btn--primary">
        Continue Shopping
      </a>
    </div>
  );
};

export default CartEmpty;
