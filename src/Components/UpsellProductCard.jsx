import React from "react";

const UpsellProductCard = ({ product }) => {
  return (
    <div className="product-upsell__holder">
      <div className="product-upsell">
        <div className="product-upsell__image">
          <a href={product.link}>
            <img src={product.image} alt={product.title} />
          </a>
        </div>
        <div className="product-upsell__content">
          <a href={product.link}>
            <p className="product-upsell__title">{product.title}</p>
            {product.variant && <p className="product-upsell__variant">{product.variant}</p>}
            <p className="product-upsell__price">
              <span className="new-price">Rs. {product.price}</span>
              <span className="old-price">Rs. {product.oldPrice}</span>
            </p>
          </a>
          <button className="product-upsell__btn">Add</button>
        </div>
      </div>
    </div>
  );
};

export default UpsellProductCard;
