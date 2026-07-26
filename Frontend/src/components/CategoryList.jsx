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
          <button
            type="button"
            key={cat.id} 
            className="category-card" 
            onClick={() => setSearch(cat.name)}
            aria-label={`Show ${cat.name} foods`}
          >
            <img
              src={`http://localhost:5000/uploads/${cat.image}`}
              alt={cat.name}
              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
            />
            <h4>{cat.name}</h4>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
