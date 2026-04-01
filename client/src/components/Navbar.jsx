import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axios";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.get("/logout");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="max-w-7xl mx-auto w-full flex justify-between items-center p-4 shadow-emerald-400 shadow-xl/30">
      <Link to="/" className="text-2xl font-bold hover:text-emerald-500">
        E-Commerce
      </Link>

      <div className="flex gap-4">
        {user ? (
          <>
            <span>👋🏻 Hi. {user.user_name}</span>
            <Link to="/products" className="hover:text-emerald-500">
              Products
            </Link>
            <Link to="/cart" className="hover:text-emerald-500">
              🛒 Cart
            </Link>
            <button onClick={handleLogout} className="hover:text-red-700">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="hover:text-blue-600">
              Signin
            </Link>
            <Link to="/signup" className="hover:text-blue-600">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
