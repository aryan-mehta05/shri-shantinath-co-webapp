import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryProducts.css";

const CategoryProducts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/product/product-category/${params.slug}`
      );
      const data = await response.json();
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="product-container">
          {products.map((product) => (
            <div
              className="product-card"
              key={product._id}
              onClick={() => {
                navigate(`/product/${product.slug}`);
              }}
            >
              <img
                className="product-image"
                src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
              <div className="product-details">
                <h3 className="product-name">Name: {product.name}</h3>
                <p className="product-quantity">Colour: {product.colour}</p>
                <p className="product-description">
                  Description: {product.description}
                </p>
                <p className="product-rate">Rate: {product.category.rate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
