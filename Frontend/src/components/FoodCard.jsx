import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import API from "../service/Api";
import "../css/FoodCard.css";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(food.id));
  }, [food.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((id) => id !== food.id);
      toast.success("Removed from Favorites");
    } else {
      favorites.push(food.id);
      toast.success("Added to Favorites");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await API.post("/cart/add", { user_id: user.id, food_id: food.id, quantity: 1 });
      toast.success("Added to Cart 🛒");
    } catch (e) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="food-card">
      <div className="favorite-icon" onClick={toggleFavorite}>
        {isFavorite ? <FaHeart color="red" size={24} /> : <FaRegHeart color="gray" size={24} />}
      </div>
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