import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/AddFood.css";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await API.get(`/category/getById/${id}`);
        setName(response.data.category.name);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCategory();
  }, [id]);

  const editCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      const response = await API.put(`/category/updateById/${id}`, formData, {
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

        <form className="add-food-form" onSubmit={editCategory}>
          <h2>Edit Category</h2>
          <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit">Update Category</button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
