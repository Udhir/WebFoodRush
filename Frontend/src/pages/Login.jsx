import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../service/Api";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/user/login", { email, password });
      login(response.data.user, response.data.token);

      if (response.data.user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (e) {
      alert(e.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="forgot-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;