import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetProfile, UpdateProfile } from "../service/Api";
import "../css/Page.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.id;

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await GetProfile(id);
      setName(res.data.user.fullname);
      setEmail(res.data.user.email);
    } catch (e) {
      console.log(e);
    }
  };

  const update = async () => {
    const formData = new FormData();
    formData.append("fullname", name);
    formData.append("email", email);
    if (image) formData.append("image", image);

    try {
      const res = await UpdateProfile(id, formData);
      toast.success(res.data.message);
    } catch (e) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="page">
      <h2>My Profile</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={update}>Update Profile</button>
    </div>
  );
};

export default Profile;