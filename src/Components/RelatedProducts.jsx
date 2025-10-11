import React from "react";
import { Link } from "react-router-dom";
import { productsData } from "../data/ProductsData"; 
import "./RelatedProducts.css";

const RelatedProducts = ({ currentSlug }) => {
  const relatedProducts = Object.entries(productsData)
    .filter(([key]) => key !== currentSlug)
    .slice(0, 4);

  return (
    <section className="related-products-section py-8">
      <div className="container">
        <h2 className="related-products-title">Related Products</h2>
        <div className="related-products-grid">
          {relatedProducts.map(([key, product]) => (
            <div key={product.id} className="related-product-card group">
              <Link to={`/product/${key}`} className="block">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="related-product-image"
                />
              </Link>

              {product.discount > 0 && (
                <span className="badge sale-badge">Sale</span>
              )}
              {!product.isActive && (
                <span className="badge soldout-badge">Sold Out</span>
              )}

              <div className="related-product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="new-price">Rs. {product.price.toFixed(0)}</span>
                  {product.comparePrice > product.price && (
                    <span className="old-price">Rs. {product.comparePrice.toFixed(0)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
