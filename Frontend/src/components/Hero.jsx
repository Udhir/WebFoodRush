import foodImage from "../assets/food.jpg";
import "../css/Hero.css";

const Hero = () => (
  <div className="hero">
    <div className="hero-left">
      <h1>Delicious Food<br />Delivered Fast</h1>
      <p>Order your favourite meals from the best restaurants near you and enjoy fast delivery with FoodRush.</p>
      <a href="/#menu" className="hero-cta">Order Now</a>
    </div>
    <div className="hero-right">
      <img src={foodImage} alt="Food" />
    </div>
  </div>
);

export default Hero;
