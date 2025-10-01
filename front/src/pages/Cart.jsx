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
    <div className="p-5">
      <h2 className="text-2xl font-bold">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="border-b py-2 flex justify-between">
                  <span>
                    {/* Safe check: if product missing, fallback */}
                    {item.product
                      ? `${item.product.name} - ${item.quantity} × $${item.product.price}`
                      : `Product ID: ${item.product_id} - ${item.quantity}`}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleCheckout}
            className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
