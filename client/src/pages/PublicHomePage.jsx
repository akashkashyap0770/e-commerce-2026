import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicHomePage() {
  return (
    <div className="min-h-screen max-w-7xl w-full mx-auto flex flex-col items-center justify-center px-4 pb-12 space-y-4">
      <h1 className="text-3xl md:text-5xl tracking-wide font-bold text-emerald-400 text-center">
        Welcome To E-Commerce App
      </h1>
      <h3 className="text-lg md:text-2xl text-gray-300 text-center">
        Hi 👋 What are you looking for today?
      </h3>
      <p className="max-w-2xl text-center tracking-wide leading-7 text-gray-400 text-sm md:text-base">
        Browse hundreds of products, add them to your cart, and shop with ease.
        Click below to start exploring!
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 w-full sm:w-auto">
        <Link
          to="/products"
          className="bg-emerald-500 text-black font-semibold px-6 py-3 rounded hover:bg-emerald-400 text-center"
        >
          🛍️ Browse Products
        </Link>
        <Link
          to="/cart"
          className="bg-gray-700 text-white font-semibold px-6 py-3 rounded hover:bg-gray-600 text-center"
        >
          🛒 View Cart
        </Link>
      </div>
    </div>
  );
}

export default PublicHomePage;
