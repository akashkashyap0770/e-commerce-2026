import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState(null);

  useEffect(() => {
    API.get("/api/products").then((res) => {
      const found = res.data.find((p) => p.id == id);
      setproduct(found);
    });
  }, [id]);

  const handleAddToCart = async () => {
    await API.post("/api/cart", {
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
    });
    alert("Added to cart");
    navigate("/cart");
  };

  if (!product)
    return (
      <h1 className="min-h-screen flex items-center justify-center">
        Loading...
      </h1>
    );

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 justify-center items-center">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full max-w-sm md:w-[400px] md:h-[400px] object-cover rounded-lg"
      />
      <div className="flex flex-col items-start gap-y-3 w-full max-w-sm md:max-w-lg">
        <h2 className="text-2xl md:text-3xl text-emerald-400 font-bold">
          {product.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-400 font-semibold">
          {product.brand}
        </p>
        <p className="text-sm md:text-base text-slate-200 leading-relaxed">
          {product.description}
        </p>
        <p className="text-lg md:text-xl text-emerald-400 font-semibold">
          ₹ {product.price}
        </p>
        <button
          onClick={handleAddToCart}
          className="w-full md:w-auto bg-emerald-400 text-black font-semibold px-6 py-2 rounded hover:bg-emerald-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
