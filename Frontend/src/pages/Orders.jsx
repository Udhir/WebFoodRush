import { useEffect, useState } from "react";
import API from "../service/Api";
import "../css/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const getOrders = async () => {
    try {
      const response = await API.get(`/order/myOrders/${user.id}`);
      setOrders(response.data.orders);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order ID : {order.id}</h3>
            <p>Total : Rs. {order.total_price}</p>
            <p>Payment : {order.payment_method}</p>
            <p>Status : {order.status}</p>
            <p>Address : {order.address}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;