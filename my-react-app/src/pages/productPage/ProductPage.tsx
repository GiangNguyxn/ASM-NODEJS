import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces/product";
import "../productPage/productPage.css";
type Props = {
  products: IProduct[];
  categories: [];
};

const ProductPage = ({ products, categories }: Props) => {
  return (
    <div className="product__container">
      <h1 className="product-title">List Products</h1>
      <div className="product-content-container">
        <div className="product-categories">
          <ul className="product-categories-content">
            {categories.map((category) => (
              <li key={category._id} className="product-category-item">
                <p className="category-name">{category?.name}</p>
                <p>Số lượng:{category?.products.length}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="product__content">
          {products.map((product) => (
            <Link key={product?._id} to={`${product?._id}`}>
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
    </div>
  );
};

export default ProductPage;
