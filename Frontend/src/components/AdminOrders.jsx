import { useEffect, useState } from "react";
import { GetOrders, UpdateOrderStatus } from "../service/Api";

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
                <td>
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