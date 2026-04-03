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
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border border-gray-600 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* Title & Price */}
                <div className="flex-1">
                  <h2 className="text-base md:text-lg font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    ₹ {item.price} × {item.quantity} ={" "}
                    <span className="text-emerald-400 font-semibold">
                      ₹ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantity(item._id, "increase")}
                    className="w-8 h-8 bg-gray-700 rounded hover:bg-gray-600 font-bold"
                  >
                    +
                  </button>
                  <span className="text-sm font-medium">
                    Qty: {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity(item._id, "decrease")}
                    className="w-8 h-8 bg-gray-700 rounded hover:bg-gray-600 font-bold"
                  >
                    -
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-sm text-red-500 hover:text-red-400 sm:ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 border-t border-gray-600 pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-bold text-emerald-400">
              ₹ {total.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
