import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { TfiMenu } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await API.get("/logout");
    setUser(null);
    navigate("/signin");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="w-full shadow-emerald-400 shadow-xl/30 relative">
      {/* Main navbar row */}
      <nav className="max-w-7xl mx-auto w-full flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-emerald-500">
          E-Commerce
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center">
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
              <Link to="/cart" className="hover:text-blue-600">
                🛒 Cart
              </Link>
              <Link to="/signin" className="hover:text-blue-600">
                Signin
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button — sirf mobile par */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <AiOutlineClose size={24} /> : <TfiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown — wrapper ke andar, full width */}
      {menuOpen && (
        <div className="md:hidden w-full bg-white dark:bg-gray-900 shadow-lg flex flex-col gap-3 px-6 py-4 z-50">
          {user ? (
            <>
              <span>👋🏻 Hi, {user.user_name}</span>
              <Link
                to="/products"
                onClick={closeMenu}
                className="hover:text-emerald-500"
              >
                Products
              </Link>
              <Link
                to="/cart"
                onClick={closeMenu}
                className="hover:text-emerald-500"
              >
                🛒 Cart
              </Link>
              <button
                onClick={handleLogout}
                className="text-left hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={closeMenu}
                className="hover:text-blue-600"
              >
                Signin
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="hover:text-blue-600"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
