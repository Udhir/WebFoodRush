import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logoImage from "../assets/logo.png";
import "../css/Navbar.css"; 

const Navbar = ({ search, setSearch }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const clearSearch = () => {
    setSearch?.("");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" onClick={clearSearch} aria-label="FoodRush home">
          <img src={logoImage} alt="" />
          <span>FoodRush</span>
        </Link>
      </div>

      <div className="nav-search">
        <label className="sr-only" htmlFor="food-search">Search food</label>
        <input
          id="food-search"
          type="search"
          placeholder="Search Food..."
          className="top-search"
          value={search || ""}
          onChange={(e) => {
            setSearch?.(e.target.value);
            if (window.location.pathname !== "/") navigate("/");
          }}
        />
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/" onClick={clearSearch}>Home</Link></li>
          <li><a href="/#menu" onClick={() => setMenuOpen(false)}>Menu</a></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user && (
            <>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </>
          )}
        </ul>
        
        <div className="nav-right">
          {user ? (
            <button type="button" className="login-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <Link className="login-btn" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
