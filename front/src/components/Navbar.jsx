import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        {user ? (
          <>
            {/* Show Profile link for logged-in users */}
            <li><Link to="/profile">Profile</Link></li>
            
            {/* Show Add Product link only for admin users */}
            {user.role === "admin" && (
              <li><Link to="/add-product">Add Product</Link></li>
            )}

            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;