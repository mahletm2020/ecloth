import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    color: "#000000",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("color", form.color);
    if (image) data.append("image", image);

    await axiosClient.post("/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/explore");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Add a New Product
          </h1>
          <p className="mt-2 text-gray-500 text-lg">
            Fill in the details to showcase your product.
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
              placeholder="Enter product name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8BD02A] focus:border-[#8BD02A] px-4 py-3 text-gray-900 placeholder-gray-400"
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
              placeholder="0.00"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8BD02A] focus:border-[#8BD02A] px-4 py-3 text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Write a short description..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows="4"
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8BD02A] focus:border-[#8BD02A] px-4 py-3 text-gray-900 placeholder-gray-400"
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
            className="w-full bg-[#8BD02A] text-white font-medium py-3 rounded-xl shadow-sm hover:bg-[#7AC024] transition-colors duration-300"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
