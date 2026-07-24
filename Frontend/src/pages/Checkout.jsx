import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../service/Api";
import "../css/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [address, setAddress] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const getCart = async () => {
    try {
      const response = await API.get(`/cart/getCart/${user.id}`);
      setCart(response.data.cart);
      setSelectedItemIds(response.data.cart.map(item => item.id));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const selectedItems = useMemo(() => {
    return cart.filter((item) => selectedItemIds.includes(item.id));
  }, [cart, selectedItemIds]);

  const allSelected = cart.length > 0 && selectedItems.length === cart.length;
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleItemSelection = (id) => {
    setSelectedItemIds((current) => {
      if (current.includes(id)) return current.filter(itemId => itemId !== id);
      return [...current, id];
    });
  };

  const toggleSelectAll = () => {
    setSelectedItemIds(allSelected ? [] : cart.map((item) => item.id));
  };

  const handleProceedToPayment = () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address.");
      return;
    }
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item to checkout.");
      return;
    }
    navigate("/demo-payment", {
      state: {
        cart: selectedItems,
        totalAmount,
        address
      }
    });
  };

  return (
    <div className="checkout-page">
      <main className="checkout-main">
        <div className="checkout-header">
          <p className="checkout-notice">Secure Checkout</p>
          <h1>Checkout</h1>
          <p className="checkout-subtitle">
            Review your cart, select one or more items, or use select all to order everything at once.
          </p>
        </div>

        <div className="checkout-body">
          <section className="checkout-panel">
            <h2 className="checkout-section-label">Delivery Details</h2>
            
            <textarea
              className="checkout-address-input"
              placeholder="Enter Full Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="checkout-panel-heading" style={{ marginTop: "30px" }}>
              <h2 className="checkout-section-label">Items</h2>
              <div className="checkout-selection-actions">
                <span className="checkout-item-count">
                  {selectedItems.length} of {cart.length} selected
                </span>
                {cart.length > 0 && (
                  <button type="button" className="checkout-select-all-btn" onClick={toggleSelectAll}>
                    {allSelected ? "Clear All" : "Select All"}
                  </button>
                )}
              </div>
            </div>
            
            {cart.length === 0 ? (
              <p style={{ color: "#666" }}>Your cart is empty.</p>
            ) : (
              <div className="checkout-game-list">
                {cart.map((item) => {
                  const isSelected = selectedItemIds.includes(item.id);
                  return (
                    <div 
                      key={item.id} 
                      className={`checkout-game-card ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleItemSelection(item.id)}
                    >
                      <span className="checkout-game-check" aria-hidden="true">{isSelected ? "✓" : ""}</span>
                      <div className="checkout-game-thumb">
                        <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.foodname} />
                      </div>
                      <div className="checkout-game-info">
                        <strong>{item.foodname}</strong>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <span className="checkout-game-price">Rs. {item.price * item.quantity}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <aside className="checkout-summary">
            <h2 className="checkout-section-label">Order Summary</h2>

            {cart.length > 0 ? (
              <>
                <div className="checkout-summary-items">
                  <div className="checkout-summary-row">
                    <span>Selected Items</span>
                    <strong>{selectedItems.reduce((sum, item) => sum + item.quantity, 0)} item{selectedItems.length !== 1 ? "s" : ""}</strong>
                  </div>
                  <div className="checkout-summary-row">
                    <span>Delivery Fee</span>
                    <strong>Free</strong>
                  </div>
                </div>
                <div className="checkout-summary-total-row">
                  <span>Pay Now</span>
                  <strong>Rs. {totalAmount}</strong>
                </div>
                <div style={{
                    marginTop: "14px", padding: "12px 14px", borderRadius: "12px",
                    background: "rgba(255, 107, 0, 0.1)", border: "1px solid rgba(255, 107, 0, 0.2)",
                    color: "#cc5500", fontSize: "14px", lineHeight: "1.5"
                }}>
                  On the next screen you can choose eSewa, Khalti, or Cash on Delivery.
                </div>
              </>
            ) : (
              <p style={{ color: "#666", marginTop: "15px" }}>Select a food item to continue.</p>
            )}

            <button 
              className="checkout-confirm-btn"
              style={{ marginTop: "20px" }}
              onClick={handleProceedToPayment}
              disabled={selectedItems.length === 0}
            >
              Proceed to Payment
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Checkout;