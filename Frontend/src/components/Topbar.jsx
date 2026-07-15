import "../css/Topbar.css";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="topbar">
      <h2>Admin Dashboard</h2>
      <h3>Welcome, {user?.fullname}</h3>
    </div>
  );
};

export default Topbar;