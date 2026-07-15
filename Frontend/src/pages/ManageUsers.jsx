import { useEffect, useState } from "react";
import { GetUsers, DeleteUser } from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/ManageFood.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      const res = await GetUsers(search);
      setUsers(res.data.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search]);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await DeleteUser(id);
      loadUsers();
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
          <h2>Manage Users</h2>
        </div>

        <input
          type="text"
          placeholder="Search Users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;