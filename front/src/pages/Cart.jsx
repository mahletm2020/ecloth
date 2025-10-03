import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import axios from "axios";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // navigate with product ID
  const goToProductDetail = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  // checkout for one item only
  const handleCheckout = async (item) => {
    try {
      // send order request to backend
      await axios.post("http://localhost:8000/api/orders", {
        product_id: item.product?.id || item.product_id,
        quantity: item.quantity,
      });

      alert(`${item.product?.name || "Product"} ordered successfully!`);

      // after checkout, remove from cart
      removeFromCart(item.id);

      // go to Orders page for user
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
                {/* Product info with image */}
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() =>
                    goToProductDetail(item.product?.id || item.product_id)
                  }
                >
                  <img
                    src={item.product?.image || "/placeholder.png"}
                    alt={item.product?.name || "Product"}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <span className="text-gray-800 font-medium">
                    {item.product
                      ? `${item.product.name} — ${item.quantity} × $${item.product.price}`
                      : `Product ID: ${item.product_id} — ${item.quantity}`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Checkout one item */}
                  <button
                    onClick={() => handleCheckout(item)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded-lg transition"
                  >
                    Checkout
                  </button>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
