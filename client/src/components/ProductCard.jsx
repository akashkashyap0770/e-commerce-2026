import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { id, thumbnail, title, brand, price } = product;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="cursor-pointer bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-emerald-400/40 transform hover:-translate-y-2 transition duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-white truncate">{title}</h2>
        <p className="text-sm text-gray-400">{brand}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-emerald-400 font-bold text-lg">₹{price}</span>
          <button className="bg-emerald-400 text-black px-3 py-1 rounded-lg text-sm hover:bg-emerald-300">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
