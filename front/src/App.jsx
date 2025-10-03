// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/Admin/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import EditProduct from "./pages/Admin/Editproduct";
import AdminOrderPage from "./pages/Admin/Orders";

function App() {
  const { user } = useAuth();

  // Protect routes
  const PrivateRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to="/explore" replace />;
    return children;
  };

  return (
    <MainLayout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />

        {/* Protected (admin-only) routes */}
        <Route
          path="/add-product"
          element={
            <PrivateRoute role="admin">
              <AddProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <PrivateRoute role="admin">
              <AdminOrderPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
