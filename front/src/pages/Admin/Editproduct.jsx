import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const EditProduct = () => {
  const { id } = useParams(); // get product id from route /products/:id/edit
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    color: "#000000",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosClient.get(`/products/${id}`);
        setForm({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          color: data.color || "#000000",
        });
        setImage(null); // user can re-upload new image
      } catch (err) {
        console.error("Failed to fetch product:", err);
        alert("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // handle form submit (PUT update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("color", form.color);
    if (image) data.append("image", image);
    data.append("_method", "PUT"); // required for Laravel when sending FormData

    try {
      await axiosClient.post(`/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      navigate("/explore");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    }
  };

  if (loading) return <p className="p-5">Loading product...</p>;

  return (
    <div className="min-h-screen bg-white px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Edit Product
          </h1>
          <p className="mt-2 text-gray-500 text-lg">
            Update details for your product.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6"
        >
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-3 text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-3 text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="4"
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-3 text-gray-900 placeholder-gray-400"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-gray-700"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to keep the current image.
            </p>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pick Accent Color
            </label>
            <input
              type="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="h-12 w-20 rounded-md border border-gray-300 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-xl shadow-sm hover:bg-blue-600 transition-colors duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
