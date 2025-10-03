// src/pages/admin/Order.jsx
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient"; // adjust path for axiosClient

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all orders (admin API)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosClient.get("/admin/orders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="p-5">Loading orders...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        📦 Orders (Admin)
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Order ID</th>
                <th className="border px-4 py-2 text-left">User</th>
                <th className="border px-4 py-2 text-left">Items</th>
                <th className="border px-4 py-2 text-left">Total</th>
                <th className="border px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">#{order.id}</td>
                  <td className="border px-4 py-2">{order.user?.name}</td>
                  <td className="border px-4 py-2">
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <img
                            src={item.product?.image || "/placeholder.png"}
                            alt={item.product?.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          {item.product?.name} × {item.quantity} = $
                          {(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2 font-semibold">
                    ${order.total}
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
