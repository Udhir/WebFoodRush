import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../css/PaymentResult.css";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("Verifying Payment...");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const data = params.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        if (decoded.status === "COMPLETE") {
          setStatus("Payment Successful!");
          setIsSuccess(true);
        } else {
          setStatus("Payment Not Completed");
        }
      } catch (e) {
        setStatus("Unable to verify payment");
      }
    }
  }, [params]);

  return (
    <div className="payment-result-container success-theme">
      <div className="result-card">
        <div className="icon-container">
          {isSuccess ? (
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          ) : (
            <div className="spinner"></div>
          )}
        </div>
        <h1>{status}</h1>
        <p>Thank you for your order. Your transaction has been completed successfully.</p>
        <Link to="/orders" className="result-btn">View My Orders</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;