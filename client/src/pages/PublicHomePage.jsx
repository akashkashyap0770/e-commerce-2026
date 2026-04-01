import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicHomePage() {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!user) return <Navigate to="/signup" />;

  return (
    <div className="h-screen max-w-7xl w-full flex flex-col items-center justify-center pb-12 space-y-4">
      <h1 className="text-5xl tracking-wide font-bold text-emerald-400">
        Welcome To E-Commerce App
      </h1>
      <h3 className="text-2xl text-gray-300">
        Hi 👋 What are you looking for today?
      </h3>
      <p className="max-w-2xl text-center tracking-wide leading-7 text-gray-400">
        Browse hundreds of products, add them to your cart, and shop with ease.
        Click below to start exploring!
      </p>
      <div className="flex gap-4 mt-4">
        <Link
          to="/products"
          className="bg-emerald-500 text-black font-semibold px-6 py-3 rounded hover:bg-emerald-400"
        >
          🛍️ Browse Products
        </Link>
        <Link
          to="/cart"
          className="bg-gray-700 text-white font-semibold px-6 py-3 rounded hover:bg-gray-600"
        >
          🛒 View Cart
        </Link>
      </div>
    </div>
  );
}

export default PublicHomePage;
