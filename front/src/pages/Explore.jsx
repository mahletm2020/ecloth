import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const Explore = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosClient.get("/products").then(({ data }) => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border rounded p-3 shadow">
          {p.image && (
            <img
              src={`http://localhost:8000/storage/${p.image}`}
              alt={p.name}
              className="w-full h-40 object-cover"
            />
          )}
          <h3 className="font-bold">{p.name}</h3>
          <p>${p.price}</p>
          <Link to={`/products/${p.id}`}>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Explore;
