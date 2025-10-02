// src/pages/Cart.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No items in your cart yet.
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li
                key={item.id}
                className="py-4 flex justify-between items-center"
              >
                <span className="text-gray-800 font-medium">
                  {item.product
                    ? `${item.product.name} — ${item.quantity} × $${item.product.price}`
                    : `Product ID: ${item.product_id} — ${item.quantity}`}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
