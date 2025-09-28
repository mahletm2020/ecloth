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
  const [image, setImage] = useState(null); // for file
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
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Price"
        type="number"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      ></textarea>

      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

      {/* Color Picker */}
      <label>
        Pick Color:
        <input
          type="color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />
      </label>

      <button type="submit">Save</button>
    </form>
  );
};

export default AddProduct;
