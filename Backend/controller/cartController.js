const {
  addCart,
  getCart,
  deleteCart,
  updateQuantity,
} = require("../model/cartModel");

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const { user_id, food_id, quantity } = req.body;

    if (!user_id || !food_id) {
      return res.status(400).json({
        message: "Field Empty",
      });
    }

    const cart = await addCart(
      user_id,
      food_id,
      quantity || 1
    );

    res.status(201).json({
      message: "Food Added To Cart",
      cart,
    });
  } catch (e) {
    res.status(500).json({
      message: "Add To Cart Failed",
      e: e.message,
    });
  }
};

// Get Cart
const getCartItems = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await getCart(id);

    res.status(200).json({
      message: "Cart Fetched Successfully",
      cart,
    });
  } catch (e) {
    res.status(500).json({
      message: "Fetch Failed",
      e: e.message,
    });
  }
};

// Update Quantity
const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cart = await updateQuantity(id, quantity);

    res.status(200).json({
      message: "Quantity Updated",
      cart,
    });
  } catch (e) {
    res.status(500).json({
      message: "Update Failed",
      e: e.message,
    });
  }
};

// Delete Cart Item
const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteCart(id);

    res.status(200).json({
      message: "Cart Item Deleted",
    });
  } catch (e) {
    res.status(500).json({
      message: "Delete Failed",
      e: e.message,
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartQuantity,
  deleteCartItem,
};