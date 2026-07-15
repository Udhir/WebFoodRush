import { useEffect, useState } from "react";
import API from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/Dashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFoods: 0,
    totalOrders: 0,
    recentOrders: [],
  });

  const getDashboard = async () => {
    try {
      const response = await API.get("/dashboard/stats");
      setStats(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />

        <div className="cards">
          <div className="card"><h2>Total Foods</h2><h1>{stats.totalFoods}</h1></div>
          <div className="card"><h2>Total Users</h2><h1>{stats.totalUsers}</h1></div>
          <div className="card"><h2>Total Orders</h2><h1>{stats.totalOrders}</h1></div>
        </div>

        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr><th>ID</th><th>User</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>Rs. {order.total_price}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;