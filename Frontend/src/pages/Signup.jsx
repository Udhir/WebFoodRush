import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../service/Api";
import "../css/Login.css";

import logo from "../assets/logo.png";

const PasswordField = ({ placeholder, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-input-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="login-input"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="new-password"
      />
      <button
        type="button"
        className="login-eye-toggle"
        onClick={() => setShowPassword((p) => !p)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitType, setSubmitType] = useState("");

  const resetMessage = () => {
    setSubmitMessage("");
    setSubmitType("");
  };

  const validate = () => {
    if (!fullname.trim()) return "Full Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!password) return "Password is required.";
    if (!confirmPassword) return "Confirm Password is required.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (loading) return;

    resetMessage();

    const err = validate();
    if (err) {
      setSubmitType("error");
      setSubmitMessage(err);
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/user/create", { fullname, email, password });
      
      setSubmitType("success");
      setSubmitMessage("Registration successful. You can now login.");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setSubmitType("error");
      setSubmitMessage(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <img src={logo} alt="logo" className="login-logo" />

          <h2 className="login-title">Sign Up</h2>

          <form onSubmit={registerUser}>
            <div className="login-input-wrapper">
              <input
                type="text"
                placeholder="Full Name"
                className="login-input"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                autoComplete="name"
              />
              <FaUser className="login-icon" />
            </div>

            <div className="login-input-wrapper">
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <FaEnvelope className="login-icon" />
            </div>

            <PasswordField
              placeholder="Password"
              name="password"
              value={password}
              onChange={setPassword}
            />

            <PasswordField
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            {submitMessage && (
              <p
                className="login-text"
                style={{
                  color: submitType === "success" ? "#2ed573" : "#ff4757",
                  marginTop: 10,
                  marginBottom: 15,
                  fontWeight: 700,
                }}
              >
                {submitMessage}
              </p>
            )}

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Please wait..." : "Register"}
            </button>
          </form>

          <p className="login-text">
            Already have an account?
            <span className="login-link" onClick={() => navigate("/login")}>
              {" "}Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;