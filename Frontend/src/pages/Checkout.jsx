import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      alert("Enter Delivery Address");
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

        const form = document.createElement("form");
        form.method = "POST";
        form.action = ESEWA_TEST_URL;

        Object.entries(config).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        return;
      }

      await API.post("/payment/cod", { order_id: order.id, amount: total });
      alert("Order Placed Successfully");
      navigate("/orders");
    } catch (e) {
      alert("Order Failed");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <textarea
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <select value={payment} onChange={(e) => setPayment(e.target.value)}>
        <option>Cash On Delivery</option>
        <option>eSewa</option>
      </select>

      <h2>Total : Rs. {total}</h2>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;