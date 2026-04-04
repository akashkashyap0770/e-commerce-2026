import { useEffect, useState } from "react";
import API from "../utils/axios";

function CartPage() {
  const [cart, setCart] = useState([]);

  const fetchCart = () => {
    API.get("/api/cart").then((res) => setCart(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantity = async (id, type) => {
    await API.patch(`/api/cart/${id}`, { type });
    fetchCart();
  };

  const handleRemove = async (id) => {
    await API.delete(`/api/cart/${id}`);
    fetchCart();
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="h-screen mt-6">
      <div>
        <h1 className="text-3xl font-bold mb-8">🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-6 hover:shadow-xl transition"
                >
                  {/* Left Content */}
                  <div className="flex flex-col gap-1 w-full">
                    <h2 className="text-lg font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-400">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-gray-800 px-4 py-1.5 rounded-xl">
                    <button
                      onClick={() => handleQuantity(item._id, "decrease")}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition"
                    >
                      −
                    </button>
                    <span className="font-semibold text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantity(item._id, "increase")}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-lg font-bold text-emerald-400">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-sm text-red-500 hover:text-red-400 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <h2 className="text-2xl font-bold text-emerald-400">
                  ₹{total.toFixed(2)}
                </h2>
              </div>

              <button className="bg-emerald-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-emerald-300 transition">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
