import API from "../service/Api";
import "../css/Page.css";

function Payment() {
  const cod = async () => {
    try {
      await API.post("/payment/cod", { order_id: 1, amount: 500 });
      alert("Cash On Delivery Selected");
    } catch (e) {
      alert("Payment Failed");
    }
  };

  const esewa = async () => {
    try {
      await API.post("/payment/esewa", { order_id: 1, amount: 500 });
      alert("Redirecting to eSewa");
    } catch (e) {
      alert("Payment Failed");
    }
  };

  return (
    <div className="page">
      <h1>Choose Payment</h1>
      <button onClick={cod}>Cash On Delivery</button>
      <button onClick={esewa}>eSewa</button>
    </div>
  );
}

export default Payment;