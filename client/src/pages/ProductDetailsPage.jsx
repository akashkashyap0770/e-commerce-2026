import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProductDetailsPage() {
  const { user } = useAuth();
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
    if (!user) return navigate("/signin");

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
    return <h1 className="h-screen bg-blacktext-center mt-6">Loading...</h1>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-6 max-w-4xl w-full grid md:grid-cols-2 gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-cover rounded-xl"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{product.title}</h1>
            <p className="text-gray-400 mt-2">{product.brand}</p>
            <p className="text-gray-300 mt-4">{product.description}</p>
          </div>

          <div className="mt-6">
            <p className="text-emerald-400 text-2xl font-bold mb-4">
              ₹{product.price}
            </p>

            <button
              onClick={handleAddToCart}
              className="w-full bg-emerald-400 text-black py-3 rounded-xl font-semibold hover:bg-emerald-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
