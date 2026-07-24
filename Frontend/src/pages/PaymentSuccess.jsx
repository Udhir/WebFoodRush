import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../css/PaymentResult.css";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying Payment...");

  useEffect(() => {
    setStatus("Payment Successful!");
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 3000);
    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  return (
    <div className="payment-result-container success-theme">
      <div className="payment-result-card">
        <div className="icon-wrapper">
          <span className="icon">✓</span>
        </div>
        <h1>{status}</h1>
        <p>Thank you for your order! Your payment has been received securely.</p>
        <button className="primary-btn" onClick={() => navigate("/orders")}>
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
