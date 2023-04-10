import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../productDetail/productDetail.css";
import { IProduct } from "../../interfaces/product";
type Props = {
  products: IProduct[];
};

const ProductDetailPage = ({ products, categories }: Props) => {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});

  const { id } = useParams();
  useEffect(() => {
    const data: any = products.find((item) => item._id == id);
    setProduct(data);
  });
  useEffect(() => {
    const data = categories.find((item) => item._id == product?.categoryId);
    setCategory(data);
  });

  return (
    <div className="productDetail__container">
      <div className="products-list">
        <ul className="">
          {products.map((product) => (
            <Link key={`${product._id}`} to={`/products/${product._id}`}>
              <li>{product.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="productDetail__content">
        <div className="productDetail-item-left">
          <h1 className="productDetail-name">{product?.name}</h1>
          <p className="productDetail-item">Price: {product?.price}</p>
          <p className="productDetail-item">Description: {product?.des}</p>
          <p className="productDetail-item">Category:{category?.name}</p>
        </div>
        <div className="productDetail-item-right">
          <img src="https://picsum.photos/id/237/200/300" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
