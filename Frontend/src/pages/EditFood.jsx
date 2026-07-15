import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/EditFood.css";

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [foodname, setFoodname] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const getFood = async () => {
    try {
      const response = await API.get(`/food/getById/${id}`);
      const food = response.data.food;

      setFoodname(food.foodname);
      setCategory(food.category);
      setDescription(food.description);
      setPrice(food.price);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFood();
  }, [id]);

  const updateFood = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("foodname", foodname);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      const response = await API.put(`/food/updateById/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      navigate("/manage-food");
    } catch (e) {
      alert(e.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="edit-food">
      <Sidebar />
      <div className="edit-food-content">
        <Topbar />

        <form className="edit-food-form" onSubmit={updateFood}>
          <h2>Edit Food</h2>
          <input type="text" value={foodname} onChange={(e) => setFoodname(e.target.value)} />
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit">Update Food</button>
        </form>
      </div>
    </div>
  );
};

export default EditFood;