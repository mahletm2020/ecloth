import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const Explore = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosClient.get("/products").then(({ data }) => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
          Explore Products
        </h1>
        <p className="mt-2 text-gray-500 text-lg">
          Discover our curated collection designed for you.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((p) => (
          <div
            key={p.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden"
          >
            {p.image && (
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                <img
                  src={`http://localhost:8000/storage/${p.image}`}
                  alt={p.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {p.name}
              </h3>
              <p className="mt-2 text-xl font-semibold text-gray-800">
                ${p.price}
              </p>

              <Link to={`/products/${p.id}`}>
                <button className="mt-4 w-full bg-[#8BD02A] text-white font-medium py-2.5 rounded-xl shadow-sm hover:bg-[#7AC024] transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
