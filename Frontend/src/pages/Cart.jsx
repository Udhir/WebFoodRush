import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/Api";
import "../css/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const response = await API.get(`/cart/getCart/${user.id}`);
      setCart(response.data.cart);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/cart/delete/${id}`);
      getCart();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.foodname} />
              <div className="cart-info">
                <h2>{item.foodname}</h2>
                <p>Quantity : {item.quantity}</p>
                <h3>Rs. {item.price}</h3>
              </div>
              <button onClick={() => deleteItem(item.id)}>Remove</button>
            </div>
          ))}

          <div className="total-box">
            <h2>Total : Rs. {total}</h2>
            <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;