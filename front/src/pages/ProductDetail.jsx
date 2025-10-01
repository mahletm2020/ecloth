import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const { addToCart } = useCart(); // 👈 use context

  useEffect(() => {
    axiosClient.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  const handleDelete = async () => {
    await axiosClient.delete(`/products/${id}`);
    navigate("/explore");
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1); // use context instead of raw axios
      alert("Product added to cart");
      navigate("/cart");
    } catch (err) {
      console.error(err);
      alert(" Failed to add to cart");
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center">
            {product.image && (
              <img
                src={`http://localhost:8000/storage/${product.image}`}
                alt={product.name}
                className="w-full max-w-sm h-auto object-cover rounded-xl shadow-md"
              />
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
            <p className="mt-3 text-gray-600">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-gray-800">
              ${product.price}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {user && (
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-colors bg-[#8BD02A] hover:bg-[#76b822]"
                >
                  🛒 Add to Cart
                </button>
              )}

              {user?.role === "admin" && (
                <>
                  <button
                    onClick={handleDelete}
                    className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/edit-product/${id}`)}
                    className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
