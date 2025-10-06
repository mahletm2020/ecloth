import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data);
        setForm(data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setUser]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  if (loading)
    return <div className="p-10 text-center text-gray-500 animate-pulse">Loading profile...</div>;

  if (!user)
    return (
      <div className="p-10 text-center text-gray-500">
        Please login to see your profile.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Profile Preview */}
        <div className="relative bg-white/60 backdrop-blur-md border border-green-100 rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 mb-6 tracking-tight">
            Profile Preview
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="text-sm uppercase text-gray-500 font-medium">Name</h3>
              <p className="text-xl font-semibold text-gray-800">
                {form.name || "No name yet"}
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase text-gray-500 font-medium">Email</h3>
              <p className="text-xl font-semibold text-gray-800">
                {form.email || "No email yet"}
              </p>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-t from-green-100/10 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Edit Profile */}
        <div className="relative bg-white border border-green-100 rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 mb-6 tracking-tight">
            Edit Profile
          </h2>
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-green-50/30 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-green-50/30 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 hover:scale-[1.02] transition-transform duration-200 shadow-sm"
            >
              Save Changes
            </button>
          </form>

          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-t from-green-100/10 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </div>
  );
}
