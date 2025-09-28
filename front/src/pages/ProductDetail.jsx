import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axiosClient from "../axiosClient";
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
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div className="product-detail">
    <h2>{product.name}</h2>
    <div className="color-swatch" style={{ backgroundColor: product.color_code }}></div>
    {product.image_path && (
        <img src={`storage/${product.image_path}`} alt={product.name} />
    )}
</div>
      {user?.role === "admin" && (
        <div>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => navigate(`/edit-product/${id}`)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
