// src/layouts/MainLayout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar stays on top */}
      <Navbar />

      {/* Main content grows to fill space */}
      <main className="flex-grow">{children}</main>

      {/* Footer stays pinned to the bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;
