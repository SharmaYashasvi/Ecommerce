import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
  value: 2.5,
  readOnly: true,

};

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars{...options} /> <span> review(256)</span>  
      </div>
      <span>{product.price}</span>
    </Link>
  );
};

export default ProductCard;
