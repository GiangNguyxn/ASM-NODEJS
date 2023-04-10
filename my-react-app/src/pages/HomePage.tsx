import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  products: [];
};

const HomePage = ({ products }: Props) => {
  return (
    <div className="product__container">
      <h1 className="product-title">Product New</h1>
      <div className="product__content">
        {products.map((product) => (
          <Link key={product?._id} to={`/products/${product?._id}`}>
            <div className="product-item">
              <div className="product-item-left">
                <h5 className="product-item-name">{product?.name}</h5>
                <p className="product-item-price">{product?.price}</p>
                <p className="product-item-des">{product?.des}</p>
                <p className="product-item-cate">{product.categoryId}</p>
              </div>
              <div className="product-item-right">
                <img src="https://picsum.photos/id/237/200/300" alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
