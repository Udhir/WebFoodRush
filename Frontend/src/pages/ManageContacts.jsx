import { useEffect, useState } from "react";
import API from "../service/Api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/ManageFood.css"; // Reuse table styles

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    try {
      const res = await API.get("/contact/getAll");
      setContacts(res.data.contacts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await API.delete(`/contact/deleteById/${id}`);
      loadContacts();
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
          <h2>Manage Messages</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.message}</td>
                <td>{new Date(c.created_at).toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteContact(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContacts;
