import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../contexts/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    axiosClient.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  const handleDelete = async () => {
    await axiosClient.delete(`/products/${id}`);
    navigate("/explore");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>

      {product.image && (
        <img
          src={`http://localhost:8000/storage/${product.image}`}
          alt={product.name}
          className="w-60 h-60 object-cover mt-3"
        />
      )}

      {/* Show multiple colors */}
      <div className="flex gap-2 mt-3">
        {product.colors?.map((color, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Order button */}
      <button className="mt-5 bg-green-500 text-white px-4 py-2 rounded">
        Order Now
      </button>

      {user?.role === "admin" && (
        <div className="mt-5 flex gap-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`/edit-product/${id}`)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
