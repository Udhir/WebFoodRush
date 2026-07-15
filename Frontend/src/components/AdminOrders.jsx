import { useEffect, useState } from "react";
import { GetOrders, UpdateOrderStatus } from "../service/Api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await GetOrders();
    setOrders(res.data.orders);
  };

  const update = async (id, status) => {
    await UpdateOrderStatus(id, { status });
    load();
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <table border="1">
        <thead>
          <tr>
            <th>User</th><th>Total</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>Rs. {order.total_price}</td>
              <td>{order.status}</td>
              <td>
                <select value={order.status} onChange={(e) => update(order.id, e.target.value)}>
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>On The Way</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;