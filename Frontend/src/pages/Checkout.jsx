import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../service/Api";
import "../css/Checkout.css";

const ESEWA_TEST_URL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("Cash On Delivery");
  const [address, setAddress] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const getCart = async () => {
    try {
      const response = await API.get(`/cart/getCart/${user.id}`);
      setCart(response.data.cart);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!address) {
      toast.error("Enter Delivery Address");
      return;
    }

    const items = cart.map((item) => ({
      food_id: item.food_id,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const orderRes = await API.post("/order/create", {
        user_id: user.id,
        total_price: total,
        payment_method: payment,
        address,
        items,
      });

      const order = orderRes.data.order;

      if (payment === "eSewa") {
        const payRes = await API.post("/payment/esewa", { order_id: order.id, amount: total });
        const config = payRes.data.esewaConfig;

        navigate('/demo-payment', { state: { config, cart } });
        return;
      }

      await API.post("/payment/cod", { order_id: order.id, amount: total });
      toast.success("Order Placed Successfully");
      navigate("/orders");
    } catch (e) {
      toast.error("Order Failed");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="map-container">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.27689199342!2d85.28493297491413!3d27.708960341738127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1704256801293!5m2!1sen!2snp"
          width="100%"
          height="200"
          style={{ border: 0, borderRadius: "8px", marginBottom: "20px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <textarea
        placeholder="Enter Full Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className="payment-options">
        <div 
          className={`payment-card ${payment === "Cash On Delivery" ? "active" : ""}`}
          onClick={() => setPayment("Cash On Delivery")}
        >
          <div className="payment-icon cod-icon">
            &#8377; {/* Using a generic currency symbol or we could use an icon if imported */}
          </div>
          <span>Cash On Delivery</span>
        </div>
        
        <div 
          className={`payment-card ${payment === "eSewa" ? "active" : ""}`}
          onClick={() => setPayment("eSewa")}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/ESewa_logo.png" 
            alt="eSewa" 
            className="esewa-logo"
          />
        </div>
      </div>

      <h2>Total : Rs. {total}</h2>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;