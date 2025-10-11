import React, { useState } from "react";
import "./CheckoutPage.css";
import CartEmpty from "../Components/CartEmpty";
import CartItem from "../Components/CartItem";
import UpsellProductCard from "../Components/UpsellProductCard";

const CheckoutPage = () => {
  // Sample cart items and upsell products (can be fetched via API)
  const [cartItems, setCartItems] = useState([
    {
      id: "48520465121568",
      title: "Ha1o Alpha",
      variant: "100 ML",
      price: 399,
      oldPrice: 999,
      quantity: 2,
      image: "//metaman.in/cdn/shop/files/PRA_0037_aab1f9d7-c272-4f5b-86fc-d41b25f279f3.jpg?v=1758198583",
      link: "/products/alpha?variant=48520465121568"
    },
  ]);

  const upsellProducts = [
    {
      id: "9378872197408",
      title: "Ha1o Alpha",
      variant: "100 ML",
      price: 399,
      oldPrice: 999,
      image: "//metaman.in/cdn/shop/files/PRA_0037_aab1f9d7-c272-4f5b-86fc-d41b25f279f3.jpg?crop=center&height=240&width=240",
      link: "/products/alpha"
    },
    {
      id: "9378806432032",
      title: "Ha1o Date",
      variant: "100 ML",
      price: 399,
      oldPrice: 999,
      image: "//metaman.in/cdn/shop/files/SHR_0025_1.jpg?crop=center&height=240&width=240",
      link: "/products/date"
    },
    {
      id: "9378885533984",
      title: "Ha1o Day",
      variant: "100 ML",
      price: 399,
      oldPrice: 999,
      image: "//metaman.in/cdn/shop/files/PRA_0538_0920a365-e3bd-47da-87dd-089ebfabd5fd.jpg?crop=center&height=240&width=240",
      link: "/products/day"
    },
  ];

  return (
    <main className="main-content">
      <div className="cart section-padding">
        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="cart__inner">
            <div className="cart__content">
              <h1 className="cart__title">
                Cart <span className="cart__items-count">{cartItems.length}</span>
              </h1>
              <a className="btn btn--outline btn--primary" href="/collections/all">
                Continue Shopping
              </a>
              <div className="cart__items">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="upsell-products">
          {upsellProducts.map((product) => (
            <UpsellProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
