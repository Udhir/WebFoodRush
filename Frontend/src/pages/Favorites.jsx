import { useEffect, useState } from "react";
import API from "../service/Api";
import FoodCard from "../components/FoodCard";
import "../css/Home.css"; 

const Favorites = () => {
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favoriteIds.length === 0) {
          setFavoriteFoods([]);
          setLoading(false);
          return;
        }

        const response = await API.get("/food/getAll");
        const allFoods = response.data.foods || [];
        
        const filtered = allFoods.filter((food) => favoriteIds.includes(food.id));
        setFavoriteFoods(filtered);
      } catch (e) {
        console.error("Failed to fetch favorites", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div style={{ minHeight: "70vh", padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Your Favorites ❤️</h1>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : favoriteFoods.length === 0 ? (
        <div style={{ textAlign: "center", color: "#666", marginTop: "50px" }}>
          <h2>No favorites yet!</h2>
          <p>Go to the menu and click the heart icon to add some.</p>
        </div>
      ) : (
        <div className="food-container">
          {favoriteFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
