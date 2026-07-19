import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../service/Api";
import "../css/DemoPayment.css";

const ESEWA_LOGO = "https://cdn.esewa.com.np/ui/images/esewa_og.png?111";
const KHALTI_LOGO = "https://blog.khalti.com/wp-content/uploads/2025/07/Khalti-Logo-New-3.png";

const DemoPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cart = [], totalAmount = 0, address = "" } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));

  const [selectedOption, setSelectedOption] = useState("esewa");
  const [esewaId, setEsewaId] = useState("");
  const [password, setPassword] = useState("");
  const [khaltiId, setKhaltiId] = useState("");
  const [khaltiPin, setKhaltiPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (cart.length === 0 || !totalAmount) {
    return (
      <div className="gateway-page">
        <main className="gateway-main">
          <section className="gateway-card">
            <h1>Invalid Request</h1>
            <p>No order details found.</p>
            <div className="gateway-footer-links">
              <Link to="/checkout">Back to Checkout</Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const handleProcessOrder = async (action) => {
    if (!user) return;
    
    if (selectedOption === "esewa" && action === "success") {
      if (!esewaId.trim() || !password.trim()) {
        setError("Please enter eSewa ID and Password.");
        return;
      }
    } else if (selectedOption === "khalti" && action === "success") {
      if (!khaltiId.trim() || !khaltiPin.trim()) {
        setError("Please enter Khalti Mobile Number and MPIN.");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      const items = cart.map((item) => ({
        food_id: item.food_id || item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      // Map our selected option to backend payment method name
      let dbMethod = "Cash On Delivery";
      if (selectedOption === "esewa") dbMethod = "eSewa";
      if (selectedOption === "khalti") dbMethod = "Khalti";

      const orderRes = await API.post("/order/create", {
        user_id: user.id,
        total_price: totalAmount,
        payment_method: dbMethod,
        address,
        items,
      });

      const order = orderRes.data.order;

      if (selectedOption === "esewa") {
        const payRes = await API.post("/payment/esewa", { order_id: order.id, amount: totalAmount });
        const config = payRes.data.esewaConfig;
        
        if (action === "success") {
            const payload = {
                status: "COMPLETE",
                transaction_uuid: config.transaction_uuid,
                total_amount: config.total_amount
            };
            const base64Data = btoa(JSON.stringify(payload));
            window.location.href = `${config.success_url}?data=${base64Data}`;
            return;
        } else {
            window.location.href = config.failure_url;
            return;
        }
      } else if (selectedOption === "khalti") {
        const payRes = await API.post("/payment/khalti", { order_id: order.id, amount: totalAmount });
        const config = payRes.data.khaltiConfig;
        
        if (action === "success") {
            window.location.href = `${config.success_url}?transaction_uuid=${config.transaction_uuid}`;
            return;
        } else {
            window.location.href = config.failure_url;
            return;
        }
      } else {
        // COD
        await API.post("/payment/cod", { order_id: order.id, amount: totalAmount });
        toast.success("Order Placed Successfully via Cash on Delivery!");
        navigate("/orders");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Failed to process the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (selectedOption) {
      case "esewa": return "Demo eSewa Gateway";
      case "khalti": return "Demo Khalti Gateway";
      case "cards": return "Card Payment Not Available";
      case "cod": return "Cash on Delivery";
      default: return "Secure Payment Gateway";
    }
  };

  const getMethodLabel = () => {
    switch (selectedOption) {
      case "esewa": return "eSewa";
      case "khalti": return "Khalti";
      case "cards": return "Credit / Debit Card";
      case "cod": return "Cash on Delivery";
      default: return "Selected Method";
    }
  };

  const handleMethodSelect = (method) => {
    if (method === "cards") {
      setError("Credit and debit card is displayed only for UI. Please use demo eSewa, Khalti, or COD.");
    } else {
      setError("");
    }
    setSelectedOption(method);
  };

  return (
    <div className={`gateway-page ${selectedOption}`}>
      <main className="gateway-main">
        <section className="gateway-card">
          <p className="gateway-badge">Demo Payment Gateway</p>
          <h1>{getTitle()}</h1>
          <p className="gateway-subtitle">
            Continue with your order using the demo payment flow below.
          </p>

          <div className="gateway-methods">
            <button
              type="button"
              className={`gateway-method-option esewa ${selectedOption === "esewa" ? "selected" : ""}`}
              onClick={() => handleMethodSelect("esewa")}
              disabled={loading}
            >
              <span className="gateway-method-logo-wrap">
                <img src={ESEWA_LOGO} alt="eSewa logo" className="gateway-method-logo" />
              </span>
              <span className="gateway-method-copy">
                <strong>eSewa</strong>
                <small>Demo eSewa wallet flow</small>
              </span>
            </button>

            <button
              type="button"
              className={`gateway-method-option khalti ${selectedOption === "khalti" ? "selected" : ""}`}
              onClick={() => handleMethodSelect("khalti")}
              disabled={loading}
            >
              <span className="gateway-method-logo-wrap">
                <img src={KHALTI_LOGO} alt="Khalti logo" className="gateway-method-logo" />
              </span>
              <span className="gateway-method-copy">
                <strong>Khalti</strong>
                <small>Demo Khalti wallet flow</small>
              </span>
            </button>

            <button
              type="button"
              className={`gateway-method-option cod ${selectedOption === "cod" ? "selected" : ""}`}
              onClick={() => handleMethodSelect("cod")}
              disabled={loading}
            >
              <span className="gateway-method-logo-wrap">
                <span className="gateway-card-icon" aria-hidden="true">&#8377;</span>
              </span>
              <span className="gateway-method-copy">
                <strong>Cash on Delivery</strong>
                <small>Pay when food arrives</small>
              </span>
            </button>
          </div>

          <div className="gateway-layout">
            <div className="gateway-order-panel">
              <h2 className="gateway-section-title">Your Order</h2>
              <div className="gateway-order-items">
                {cart.map((item, index) => (
                  <div className="gateway-order-item" key={index}>
                    <div className="gateway-order-thumb">
                      <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.foodname} />
                    </div>
                    <div className="gateway-order-copy">
                      <strong>{item.foodname}</strong>
                      <span style={{ color: "#666", fontSize: "14px" }}>Qty: {item.quantity}</span>
                    </div>
                    <span style={{ fontWeight: 700, color: "#ff6b00" }}>
                      Rs. {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="gateway-order-total">
                <span>Total Amount</span>
                <strong>Rs. {totalAmount}</strong>
              </div>
            </div>

            <div className="gateway-payment-panel">
              <div className="gateway-summary">
                <div>
                  <span>Method</span>
                  <strong>{getMethodLabel()}</strong>
                </div>
                <div>
                  <span>Delivery To</span>
                  <strong style={{ fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{address}</strong>
                </div>
              </div>

              {error && (
                <div className="gateway-status gateway-status-error">
                  <strong>Action Failed</strong>
                  <span>{error}</span>
                </div>
              )}

              {selectedOption === "esewa" ? (
                <form className="gateway-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="gateway-brand-row">
                    <img src={ESEWA_LOGO} alt="eSewa" className="gateway-brand-logo" />
                  </div>
                  <label className="gateway-field">
                    <span>eSewa ID / Mobile Number</span>
                    <input
                      type="text"
                      placeholder="e.g. 98xxxxxxxxx"
                      value={esewaId}
                      onChange={(e) => setEsewaId(e.target.value)}
                      disabled={loading}
                    />
                  </label>
                  <label className="gateway-field">
                    <span>Password</span>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </label>
                  <div className="gateway-actions">
                    <button
                      type="button"
                      className="gateway-btn gateway-btn-primary"
                      onClick={() => handleProcessOrder("success")}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Confirm Payment"}
                    </button>
                    <button
                      type="button"
                      className="gateway-btn gateway-btn-danger"
                      onClick={() => handleProcessOrder("failed")}
                      disabled={loading}
                    >
                      Payment Failed
                    </button>
                  </div>
                </form>
              ) : selectedOption === "khalti" ? (
                <form className="gateway-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="gateway-brand-row">
                    <img src={KHALTI_LOGO} alt="Khalti" className="gateway-brand-logo" style={{ maxHeight: "32px", width: "auto" }} />
                  </div>
                  <label className="gateway-field">
                    <span>Mobile Number</span>
                    <input
                      type="text"
                      placeholder="e.g. 98xxxxxxxxx"
                      value={khaltiId}
                      onChange={(e) => setKhaltiId(e.target.value)}
                      disabled={loading}
                    />
                  </label>
                  <label className="gateway-field">
                    <span>MPIN</span>
                    <input
                      type="password"
                      placeholder="Enter MPIN"
                      value={khaltiPin}
                      onChange={(e) => setKhaltiPin(e.target.value)}
                      disabled={loading}
                    />
                  </label>
                  <div className="gateway-actions">
                    <button
                      type="button"
                      className="gateway-btn gateway-btn-primary"
                      onClick={() => handleProcessOrder("success")}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Pay Now"}
                    </button>
                    <button
                      type="button"
                      className="gateway-btn gateway-btn-danger"
                      onClick={() => handleProcessOrder("failed")}
                      disabled={loading}
                    >
                      Simulate Failure
                    </button>
                  </div>
                </form>
              ) : (
                <form className="gateway-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="gateway-brand-row" style={{ justifyContent: "center" }}>
                    <h3 style={{ margin: 0, color: "#ff6b00", fontSize: "18px" }}>Cash On Delivery</h3>
                  </div>
                  <p style={{ color: "#666", lineHeight: 1.5, fontSize: "15px", margin: 0 }}>
                    You have selected Cash on Delivery. Please keep exact change ready when your food arrives!
                  </p>
                  <div className="gateway-actions" style={{ marginTop: "20px" }}>
                    <button
                      type="button"
                      className="gateway-btn gateway-btn-primary"
                      onClick={() => handleProcessOrder("success")}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Confirm Order"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="gateway-footer-links">
            <Link to="/checkout">Back to Checkout</Link>
            <Link to="/cart">Back to Cart</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DemoPayment;
