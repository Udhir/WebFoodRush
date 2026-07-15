import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/Api";
import "../css/Page.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const send = async () => {
    try {
      const res = await API.post("/auth/forgot", { email });
      alert(`OTP Sent: ${res.data.otp} (demo mode — normally emailed)`);
      navigate("/reset-password");
    } catch (e) {
      alert(e.response?.data?.message || "Failed to send OTP");
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