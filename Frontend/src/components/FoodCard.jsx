import { Link, useNavigate } from "react-router-dom";
import API from "../service/Api";
import "../css/FoodCard.css";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await API.post("/cart/add", { user_id: user.id, food_id: food.id, quantity: 1 });
      alert("Added to Cart");
    } catch (e) {
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="food-card">
      <img src={`http://localhost:5000/uploads/${food.image}`} alt={food.foodname} />
      <div className="food-content">
        <h3>{food.foodname}</h3>
        <p>{food.description}</p>
        <h2>Rs. {food.price}</h2>
        <div className="food-btn">
          <Link to={`/food/${food.id}`}>
            <button className="view-btn">View</button>
          </Link>
          <button className="cart-btn" onClick={addToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;