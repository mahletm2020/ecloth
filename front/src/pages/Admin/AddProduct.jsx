import { useState } from "react";
// import axiosClient from "../axiosClient";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" , color:""});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosClient.post("/products", form);
    navigate("/explore");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Price" type="number" onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
      <input placeholder="Image URL" onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <input placeholder="color" onChange={(e) => setForm({ ...form, color: e.target.value })} />
      <button type="submit">Save</button>
    </form>
  );
};

export default AddProduct;
