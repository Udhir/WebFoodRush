import { useEffect, useState } from "react";
import { GetCategories } from "../service/Api";
import "../css/Category.css";

const CategoryList = ({ setSearch }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await GetCategories();
      setCategories(res.data.category);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="category-section">
      <h2>Categories</h2>
      <div className="category-list">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="category-card" 
            onClick={() => setSearch(cat.name)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`http://localhost:5000/uploads/${cat.image}`}
              alt={cat.name}
              style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "50%" }}
            />
            <h4>{cat.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;