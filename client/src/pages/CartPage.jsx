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
    fetchCart(); // refresh
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="h-screen p-6">
      <h1 className="text-2xl mb-4">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="border p-4 mb-2">
              <h2>{item.title}</h2>
              <p>
                ₹ {item.price} × {item.quantity} = ₹{" "}
                {(item.price * item.quantity).toFixed(2)}
              </p>
              {/* Quantity Controls */}
              <div>
                <button onClick={() => handleQuantity(item._id, "increase")}>
                  +
                </button>
                <p>Qty: {item.quantity}</p>
                <button onClick={() => handleQuantity(item._id, "decrease")}>
                  -
                </button>
              </div>
              <button onClick={() => handleRemove(item._id)}>Remove</button>
            </div>
          ))}
          <div>Total: ₹ {total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
}

export default CartPage;
