import { useNavigate } from "react-router-dom";
import "../css/PaymentResult.css";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-result-container failure-theme">
      <div className="payment-result-card">
        <div className="icon-wrapper">
          <span className="icon">✕</span>
        </div>
        <h1>Payment Failed</h1>
        <p>Unfortunately, your payment could not be processed. Please try again.</p>
        <button className="primary-btn" onClick={() => navigate("/checkout")}>
          Return to Checkout
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
