import { Link } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <h2>FoodRush</h2>
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/manage-food">Manage Food</Link></li>
        <li><Link to="/manage-users">Manage Users</Link></li>
        <li><Link to="/manage-categories">Manage Categories</Link></li>
        <li><Link to="/manage-orders">Manage Orders</Link></li>
        <li><Link to="/manage-contacts">Manage Messages</Link></li>
        <li><button type="button" className="sidebar-logout" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
