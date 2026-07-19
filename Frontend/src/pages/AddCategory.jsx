import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/AddFood.css"; // Reusing the same form CSS

const AddCategory = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const addCategory = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Please provide both name and image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await API.post("/category/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      navigate("/manage-categories");
    } catch (e) {
      alert(e.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="add-food">
      <Sidebar />
      <div className="add-food-content">
        <Topbar />

        <form className="add-food-form" onSubmit={addCategory}>
          <h2>Add New Category</h2>
          <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
