import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { id, thumbnail, title, description, brand, price } = product;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="p-4 shadow-xl/30 shadow-emerald-400 hover:emerald-500 hover:scale-105 duration-300"
    >
      <img src={thumbnail} alt={title} />
      <h2 className="text-xl mb-2 text-emerald-400">{title}</h2>
      <p>{brand}</p>
      <p className="text-md text-gray-300">{description}</p>
      <p className="text-emerald-400">₹{price}</p>
    </div>
  );
}

export default ProductCard;
