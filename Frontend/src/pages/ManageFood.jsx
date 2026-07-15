import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/ManageFood.css";

const ManageFood = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  const getFoods = async () => {
    try {
      const response = await API.get("/food/getAll", { params: { search } });
      setFoods(response.data.foods);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFoods();
  }, [search]);

  const deleteFood = async (id) => {
    if (!window.confirm("Delete this food?")) return;

    try {
      await API.delete(`/food/deleteById/${id}`);
      getFoods();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="manage-food">
      <Sidebar />
      <div className="manage-food-content">
        <Topbar />

        <div className="food-header">
          <h2>Manage Foods</h2>
          <Link to="/add-food"><button>Add Food</button></Link>
        </div>

        <input
          type="text"
          placeholder="Search Food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr><th>ID</th><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Action</th></tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td>{food.id}</td>
                <td><img src={`http://localhost:5000/uploads/${food.image}`} alt={food.foodname} /></td>
                <td>{food.foodname}</td>
                <td>{food.category}</td>
                <td>Rs. {food.price}</td>
                <td>
                  <Link to={`/edit-food/${food.id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button className="delete-btn" onClick={() => deleteFood(food.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFood;