import { createContext, useState, useEffect, useContext } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

// Create the context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate(); // useNavigate hook here
  // Check profile whenever token changes
  useEffect(() => {
    if (token) {
      axiosClient.get("/auth/profile")
        .then(({ data }) => setUser(data))
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  // Login
  const login = async (email, password) => {
    const { data } = await axiosClient.post("/auth/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  // Register
  const register = async (name, email, password) => {
    const { data } = await axiosClient.post("/auth/register", { name, email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    navigate("/"); //donforget to change it to where user stoped  flow shi
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login"); // send user to login page
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
