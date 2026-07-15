import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../service/Api";
import "../css/FoodDetails.css";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getFood = async () => {
    try {
      const response = await API.get(`/food/getById/${id}`);
      setFood(response.data.food);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFood();
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await API.post("/cart/add", { user_id: user.id, food_id: food.id, quantity });
      alert("Food Added To Cart");
      navigate("/cart");
    } catch (e) {
      alert("Failed To Add Cart");
    }
  };

  if (!food) return <h2>Loading...</h2>;

  return (
    <div className="food-details">
      <img src={`http://localhost:5000/uploads/${food.image}`} alt={food.foodname} />
      <div className="food-info">
        <h1>{food.foodname}</h1>
        <p>{food.description}</p>
        <h2>Rs. {food.price}</h2>
        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        <button onClick={addToCart}>Add To Cart</button>
      </div>
    </div>
  );
};

export default FoodDetails;