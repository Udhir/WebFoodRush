import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../service/Api";
import "../css/Page.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const send = async () => {
    try {
      await API.post("/user/forgot-password", { email });
      toast.success(`OTP Sent to your email!`);
      navigate("/reset-password");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="page">
      <h1>Forgot Password</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={send}>Send OTP</button>
    </div>
  );
}

export default ForgotPassword;