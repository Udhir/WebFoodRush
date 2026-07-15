import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "../css/Navbar.css"; 

const Navbar = ({ search, setSearch }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      
      <div className="nav-left">
        <div className="logo">
          <Link to="/">FoodRush</Link>
        </div>
        
        <input 
          type="text" 
          placeholder="Search Food..." 
          className="top-search"
          value={search || ""}
          onChange={(e) => {
            setSearch(e.target.value);
            navigate("/#menu");
          }}
        />
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        
        {/* 👈 FIXED: Now this will actually scroll down to the food! */}
        <li><a href="#menu">Menu</a></li>
        
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {user && <li><Link to="/orders">Orders</Link></li>}
      </ul>

      <div className="nav-right">
        {user ? (
          <>
            <Link to="/cart"><FaShoppingCart /></Link>
            <Link to="/profile"><FaUserCircle /></Link>
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;