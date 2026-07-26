import { useEffect, useState } from "react";

import API from "../service/Api";
import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import FoodCard from "../components/FoodCard";

import "../css/Home.css";
import "../css/FoodCard.css";

const Home = ({ search = "", setSearch }) => {
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFoods = async () => {
    try {
      setLoading(true);

      const response = await API.get("/food/getAll");

      setAllFoods(response.data.foods || []);
    } catch (error) {
      console.error("Failed to load foods:", error);
      setAllFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  const filteredFoods = allFoods.filter((food) => {
    const foodName = food.foodname || "";
    const category = food.category || "";
    const searchTerm = search.trim().toLowerCase();

    return (
      foodName.toLowerCase().includes(searchTerm) ||
      category.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="home-page">
      <Hero />

      <section
        id="menu"
        className="menu-section"
      >
        <CategoryList setSearch={setSearch} />

        {loading ? (
          <p className="food-message">
            Loading foods...
          </p>
        ) : filteredFoods.length === 0 ? (
          <p className="food-message">
            No food items found.
          </p>
        ) : (
          <div className="food-container">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;