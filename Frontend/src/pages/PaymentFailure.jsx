import { Link } from "react-router-dom";
import "../css/Page.css";
const PaymentFailure = () => (
  <div className="page">
    <h1>Payment Failed</h1>
    <p>Something went wrong with your eSewa transaction.</p>
    <Link to="/checkout">Try Again</Link>
  </div>
);

export default PaymentFailure;