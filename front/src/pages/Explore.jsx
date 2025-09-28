import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../contexts/AuthContext"; 
import { Link } from "react-router-dom";

const Explore = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosClient.get("/products").then(({ data }) => setProducts(data));
  }, []);

  return (
    <div>
      <h2>Explore Products</h2>
      {user?.role === "admin" && <Link to="/add-product">Add Product</Link>}
      <div>
        {products.map((p) => (
          <div key={p.id}>
            <Link to={`/products/${p.id}`}>
              <h3>{p.name}</h3>
            </Link>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
