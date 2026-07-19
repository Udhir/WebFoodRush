import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../service/Api";
import "../css/Page.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const reset = async () => {
    try {
      const res = await API.post("/user/reset-password", { email, otp, newPassword: password });
      toast.success(res.data.message || "Password Updated");
      navigate("/login");
    } catch (e) {
      toast.error(e.response?.data?.message || "Reset Failed");
    }
  };

  return (
    <div className="page">
      <h1>Reset Password</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
      <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default ResetPassword;