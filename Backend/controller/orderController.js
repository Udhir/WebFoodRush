const {
  createOrder,
  addOrderItem,
  getAllOrders,
  getMyOrders,
  updateStatus,
  deleteOrderById,
} = require("../model/orderModel");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const {
      user_id,
      total_price,
      payment_method,
      items,
    } = req.body;

    if (!user_id || !total_price || !payment_method) {
      return res.status(400).json({
        message: "Field Empty",
      });
    }

    const order = await createOrder(
      user_id,
      total_price,
      payment_method
    );

    for (const item of items) {
      await addOrderItem(
        order.id,
        item.food_id,
        item.quantity,
        item.price
      );
    }

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });
  } catch (e) {
    res.status(500).json({
      message: "Order Failed",
      e: e.message,
    });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();

    res.status(200).json({
      message: "Orders Fetched",
      orders,
    });
  } catch (e) {
    res.status(500).json({
      message: "Fetch Failed",
      e: e.message,
    });
  }
};

// Get My Orders
const myOrders = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await getMyOrders(id);

    res.status(200).json({
      message: "My Orders",
      orders,
    });
  } catch (e) {
    res.status(500).json({
      message: "Fetch Failed",
      e: e.message,
    });
  }
};

// Change Status
const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await updateStatus(id, status);

    res.status(200).json({
      message: "Status Updated",
      order,
    });
  } catch (e) {
    res.status(500).json({
      message: "Update Failed",
      e: e.message,
    });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteOrderById(id);

    res.status(200).json({
      message: "Order Deleted",
    });
  } catch (e) {
    res.status(500).json({
      message: "Delete Failed",
      e: e.message,
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  myOrders,
  changeStatus,
  deleteOrder,
};