import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/ManageFood.css"; // Reuse the same CSS for the table layout

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const loadCategories = async () => {
    try {
      const response = await API.get("/category/getAll", { params: { search } });
      setCategories(response.data.category);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [search]);

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await API.delete(`/category/deleteById/${id}`);
      loadCategories();
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
          <h2>Manage Categories</h2>
          <Link to="/add-category"><button>Add Category</button></Link>
        </div>

        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr><th>ID</th><th>Image</th><th>Name</th><th>Action</th></tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td><img src={`http://localhost:5000/uploads/${cat.image}`} alt={cat.name} /></td>
                <td>{cat.name}</td>
                <td>
                  <Link to={`/edit-category/${cat.id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button className="delete-btn" onClick={() => deleteCategory(cat.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCategories;
