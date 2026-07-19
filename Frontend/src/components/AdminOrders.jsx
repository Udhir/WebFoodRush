import { useEffect, useState } from "react";
import { GetOrders, UpdateOrderStatus, DeleteOrder } from "../service/Api";
import toast from "react-hot-toast";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../css/ManageFood.css"; // Reuse the layout styling from ManageFood

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await GetOrders();
    setOrders(res.data.orders);
  };

  const update = async (id, status) => {
    await UpdateOrderStatus(id, { status });
    load();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await DeleteOrder(id);
        toast.success("Order deleted successfully");
        load();
      } catch (e) {
        toast.error("Failed to delete order");
      }
    }
  };

  return (
    <div className="manage-food">
      <Sidebar />
      <div className="manage-food-content">
        <Topbar />

        <div className="food-header">
          <h2>Manage Orders</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.fullname}</td>
                <td>Rs. {order.total_price}</td>
                <td>{order.status}</td>
                <td style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => update(order.id, e.target.value)}
                    style={{ padding: "5px", borderRadius: "4px" }}
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>On The Way</option>
                    <option>Delivered</option>
                  </select>
                  <button 
                    onClick={() => handleDelete(order.id)}
                    style={{ background: "#ff3b3b", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;