import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
  return (
    <footer>
      <div>
        <h2>FoodRush</h2>
        <p>Fast Delivery Service</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div>
        <h3>Contact</h3>
        <p>Kathmandu, Nepal</p>
        <p>foodrush@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;