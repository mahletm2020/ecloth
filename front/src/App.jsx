import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome {user.name} ({user.role})</h1>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </div>
  );
}
