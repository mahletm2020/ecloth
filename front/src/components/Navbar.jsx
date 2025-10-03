import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";  
import { 
  FaShoppingCart, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaUserPlus 
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-black font-semibold"
      : "text-gray-700 hover:text-black";

  // calculate total quantity
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-[#8BD02A]"
          >
            eCloth
          </Link>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className={`${isActive("/")} transition`}>
              Home
            </Link>
            <Link to="/explore" className={`${isActive("/explore")} transition`}>
              Explore
            </Link>

            {/* Cart with badge */}
           { user ?(
            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-gray-700 hover:text-black transition"
            >
              <FaShoppingCart className="text-lg" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
            </Link>
            ): null
          }


            {user ? (
              <>
                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-1 text-gray-700 hover:text-black transition"
                >
                  <FaUserCircle className="text-lg" />
                  <span>Profile</span>
                </Link>

                {/* Admin only */}
                {user.role === "admin" && (
                  <Link
                    to="/add-product"
                    className={`${isActive("/add-product")} transition`}
                  >
                    Add Product
                  </Link>
                )}

                {/* Logout */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8BD02A] text-white font-medium hover:bg-[#76B624] transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8BD02A] text-white font-medium hover:bg-[#76B624] transition"
                >
                  <FaSignInAlt />
                  Login
                </Link>

                {/* Register */}
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-black hover:text-black transition"
                >
                  <FaUserPlus />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
