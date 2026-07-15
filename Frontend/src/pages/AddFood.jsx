import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/AddFood.css";

const AddFood = () => {
  const navigate = useNavigate();

  const [foodname, setFoodname] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const addFood = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("foodname", foodname);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const response = await API.post("/food/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      navigate("/manage-food");
    } catch (e) {
      alert(e.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="add-food">
      <Sidebar />
      <div className="add-food-content">
        <Topbar />

        <form className="add-food-form" onSubmit={addFood}>
          <h2>Add New Food</h2>
          <input type="text" placeholder="Food Name" value={foodname} onChange={(e) => setFoodname(e.target.value)} />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit">Add Food</button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;