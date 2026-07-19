import { Link } from "react-router-dom";
import "../css/PaymentResult.css";

const PaymentFailure = () => (
  <div className="payment-result-container failure-theme">
    <div className="result-card">
      <div className="icon-container">
        <svg className="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="crossmark-circle" cx="26" cy="26" r="25" fill="none" />
          <path className="crossmark-path" fill="none" d="M16 16 36 36 M36 16 16 36" />
        </svg>
      </div>
      <h1>Payment Failed</h1>
      <p>Oops! Something went wrong with your eSewa transaction. Please try again.</p>
      <Link to="/checkout" className="result-btn">Try Again</Link>
    </div>
  </div>
);

export default PaymentFailure;