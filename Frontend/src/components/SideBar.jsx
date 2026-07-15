import { Link } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = () => (
  <div className="sidebar">
    <h2>FoodRush</h2>
    <ul>
      <li><Link to="/admin">Dashboard</Link></li>
      <li><Link to="/manage-food">Manage Food</Link></li>
      <li><Link to="/manage-users">Manage Users</Link></li>
      <li><Link to="/manage-orders">Manage Orders</Link></li>
      <li><Link to="/">Back Home</Link></li>
    </ul>
  </div>
);

export default Sidebar;