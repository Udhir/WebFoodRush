import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../service/Api";
import { useAuth } from "../context/AuthContext";
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
        autoComplete="current-password"
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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitType, setSubmitType] = useState("");

  const resetMessage = () => {
    setSubmitMessage("");
    setSubmitType("");
  };

  const validate = () => {
    if (!email.trim()) return "Email is required.";
    if (!password) return "Password is required.";
    return "";
  };

  const loginUser = async (e) => {
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
      const response = await API.post("/user/login", { email, password });
      login(response.data.user, response.data.token);

      setSubmitType("success");
      setSubmitMessage(response.data.message || "Login successful.");

      setTimeout(() => {
        if (response.data.user.role === "admin") navigate("/admin");
        else navigate("/");
      }, 500);
    } catch (error) {
      setSubmitType("error");
      setSubmitMessage(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <img src={logo} alt="logo" className="login-logo" />

          <h2 className="login-title">Login</h2>

          <form onSubmit={loginUser}>
            <div className="login-input-wrapper">
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaEnvelope className="login-icon" />
            </div>

            <PasswordField
              placeholder="Password"
              name="password"
              value={password}
              onChange={setPassword}
            />

            <div className="login-forgot-row">
              <button
                type="button"
                className="login-forgot"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            {submitMessage && (
              <p
                className="login-text"
                style={{
                  color: submitType === "success" ? "#2ed573" : "#ff4757",
                  marginTop: 0,
                  marginBottom: 15,
                  fontWeight: 700,
                }}
              >
                {submitMessage}
              </p>
            )}

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>

          <p className="login-text">
            Don't have an account?
            <span className="login-link" onClick={() => navigate("/signup")}>
              {" "}Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;