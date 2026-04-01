import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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

  if (!product) return <h1 className="h-screen">Loading...</h1>;

  return (
    <div className="h-screen max-w-7xl mx-auto gap-5 justify-center items-center flex p-10 ">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-[400px] w-[400px]"
      />
      <div className="flex flex-col items-start gap-y-2 p-8">
        <h2 className="text-3xl mb-2 text-emerald-400 font-bold">
          {product.title}
        </h2>
        <p className="text-xl text-gray-400 font-semibold">{product.brand}</p>
        <p className="text-md text-slate-200">{product.description}</p>
        <p className="mb-4 text-emerald-400 font-semibold">₹ {product.price}</p>
        <button
          onClick={handleAddToCart}
          className="bg-emerald-400 text-black font-semibold p-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
