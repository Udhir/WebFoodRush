import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../css/Page.css";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const data = params.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        setStatus(decoded.status === "COMPLETE" ? "Payment Successful" : "Payment Not Completed");
      } catch (e) {
        setStatus("Unable to verify payment");
      }
    }
  }, [params]);

  return (
    <div className="page">
      <h1>{status}</h1>
      <Link to="/orders">View My Orders</Link>
    </div>
  );
};

export default PaymentSuccess;