import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import API from '../service/Api';
import '../css/Auth.css';

import logo from '../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setMessage('');
    setMessageType('');
    setLoading(true);

    try {
      const response = await API.post('/user/forgot-password', { email });
      setMessageType('success');
      setMessage(response.data.message || 'OTP verification code sent to your email.');

      setTimeout(() => {
        navigate('/otp-verification', { state: { email } });
      }, 1500);

    } catch (err) {
      setMessageType('error');
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logo} alt="logo" className="auth-logo" />
        
        <h2 className="auth-title">Forgot Password</h2>
        
        <p style={{ textAlign: "center", color: "#666", marginBottom: "25px", fontSize: "14px", lineHeight: "1.5" }}>
          Enter your registered email address and we'll send you a 6-digit verification code.
        </p>

        {message && (
          <div className={`auth-message ${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-wrapper">
            <input
              type="email"
              placeholder="Email address"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            <FaEnvelope style={{ color: '#aaa', fontSize: '16px' }} />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Sending Code...' : 'Send OTP Code'}
          </button>
        </form>

        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <button 
            onClick={() => navigate('/login')}
            style={{ 
              background: "none", 
              border: "none", 
              color: "#ff6b00", 
              fontWeight: "700", 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%"
            }}
          >
            <FaArrowLeft /> Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;