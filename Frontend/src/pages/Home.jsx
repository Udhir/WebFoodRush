import { useEffect, useState } from "react";
import API from "../service/Api";
import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import FoodCard from "../components/FoodCard";

import "../css/Home.css"; 
import "../css/foodcard.css"; 

const Home = ({ search }) => { 
  const [allFoods, setAllFoods] = useState([]);

  const getFoods = async () => {
    try {
      const response = await API.get("/food/getAll");
      setAllFoods(response.data.foods);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  // 👈 This is the crash-proof, lightning-fast frontend search!
  const filteredFoods = allFoods.filter((food) => {
    const foodName = food.foodname || "";
    const category = food.category || "";
    const searchTerm = search || "";
    return foodName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Hero />
      <div id="menu" style={{ scrollMarginTop: "100px" }}>
        <CategoryList />
        <div className="food-container">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;