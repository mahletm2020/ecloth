// src/contexts/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // requires AuthProvider above CartProvider
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch cart from server (only when user exists)
  const refreshCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }
    try {
      setLoading(true);
      const { data } = await axiosClient.get("/cart");
      setCart(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("refreshCart error:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // auto refresh when user changes (login/logout)
  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // add item to cart (server-side)
  const addToCart = async (product_id, quantity = 1) => {
    if (!user) throw new Error("You must be logged in to add to cart");
    try {
      const { data } = await axiosClient.post("/cart", { product_id, quantity });
      // on success, refresh cart list from server
      await refreshCart();
      return data;
    } catch (err) {
      console.error("addToCart error:", err);
      throw err;
    }
  };

  // remove cart item (cart item id is used)
  const removeFromCart = async (cartItemId) => {
    try {
      await axiosClient.delete(`/cart/${cartItemId}`);
      await refreshCart();
    } catch (err) {
      console.error("removeFromCart error:", err);
      throw err;
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, refreshCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
