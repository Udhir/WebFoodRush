import { Link } from "react-router-dom";
import "../css/Hero.css";

const Hero = () => (
  <div className="hero">
    <div className="hero-left">
      <h1>Delicious Food<br />Delivered Fast</h1>
      <p>Order your favourite meals from the best restaurants near you and enjoy fast delivery with FoodRush.</p>
      <Link to="/menu"><button>Order Now</button></Link>
    </div>
    <div className="hero-right">
      <img src="/hero-food.png" alt="Food" />
    </div>
  </div>
);

export default Hero;