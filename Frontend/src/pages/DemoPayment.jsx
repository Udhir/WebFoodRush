import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/PaymentResult.css"; 
import "../css/DemoPayment.css"; // Import the new CSS file

const DemoPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { config, cart = [] } = location.state || {};

  if (!config) {
    return (
      <div className="payment-result-container failure-theme">
        <div className="result-card">
          <h1>Invalid Request</h1>
          <p>No payment configuration found.</p>
          <button className="result-btn" onClick={() => navigate("/checkout")}>Go Back</button>
        </div>
      </div>
    );
  }

  const simulateSuccess = () => {
    const payload = {
      status: "COMPLETE",
      transaction_uuid: config.transaction_uuid,
      total_amount: config.total_amount
    };
    const base64Data = btoa(JSON.stringify(payload));
    window.location.href = `${config.success_url}?data=${base64Data}`;
  };

  const simulateFailure = () => {
    window.location.href = config.failure_url;
  };

  const [esewaId, setEsewaId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!esewaId || !password) {
      alert("Please enter eSewa ID and Password");
      return;
    }
    simulateSuccess();
  };

  return (
    <div className="demo-payment-page">
      <div className="demo-payment-layout">
        
        {/* Left Side: Order Summary */}
        <div className="demo-order-summary">
          <h2 className="summary-title">YOUR ORDER</h2>
          <div className="summary-items">
            {cart.map((item, index) => (
              <div className="summary-item" key={index}>
                <div className="summary-item-left">
                  <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.foodname} className="summary-item-img" />
                  <div className="summary-item-info">
                    <h3>{item.foodname}</h3>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="summary-item-price">
                  Rs. {item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total-footer">
            <span className="summary-total-label">Total</span>
            <span className="summary-total-amount">Rs. {config.total_amount}</span>
          </div>
        </div>

        {/* Right Side: eSewa Payment Card */}
        <div className="result-card demo-payment-card split-card">
          <div className="demo-header">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/f/f2/ESewa_logo.png" 
              alt="eSewa" 
              style={{ height: "40px", marginBottom: "15px" }}
            />
            <p className="demo-subtitle">Pay using your eSewa account</p>
          </div>

          <div className="demo-details-box">
            <div className="demo-row">
              <span className="demo-label">Merchant</span>
              <strong className="demo-value">{config.product_code}</strong>
            </div>
            <div className="demo-total-row">
              <span className="demo-total-label">Amount</span>
              <strong className="demo-total-value">Rs. {config.total_amount}</strong>
            </div>
          </div>

          <form onSubmit={handleLogin} className="demo-login-form">
            <div className="form-group">
              <label>eSewa ID (Mobile Number)</label>
              <input 
                type="text" 
                placeholder="e.g. 98xxxxxxxxx"
                value={esewaId}
                onChange={(e) => setEsewaId(e.target.value)}
                className="esewa-input"
              />
            </div>
            <div className="form-group">
              <label>Password / MPIN</label>
              <input 
                type="password" 
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="esewa-input"
              />
            </div>
            <div className="demo-actions">
              <button type="submit" className="demo-btn demo-btn-success">
                Confirm Payment
              </button>
              <button 
                type="button" 
                onClick={simulateFailure}
                className="demo-btn demo-btn-cancel"
              >
                Payment Failed
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default DemoPayment;
