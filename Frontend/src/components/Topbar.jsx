import { Link } from "react-router-dom";
import "../css/Topbar.css";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="topbar">
      <h2>Admin Dashboard</h2>

      <div className="topbar-right">
        <h3>Welcome, {user?.fullname || "Admin"}</h3>

        <Link to="/" className="go-to-site-btn">
          Go to Site
        </Link>
      </div>
    </div>
  );
};

export default Topbar;