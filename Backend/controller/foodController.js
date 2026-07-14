const {
  createFood,
  getAllFood,
  searchFood,
  getFoodById,
  deleteFoodById,
  updateFoodById,
} = require("../model/foodModel");

// Add Food
const addFood = async (req, res) => {
  try {
    const { foodname, description, price, category } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!foodname || !description || !price || !category) {
      return res.status(400).json({
        message: "Field Empty",
      });
    }

    const food = await createFood(
      foodname,
      description,
      price,
      category,
      image
    );

    res.status(201).json({
      message: "Food Added Successfully",
      food,
    });
  } catch (e) {
    res.status(500).json({
      message: "Food Add Failed",
      e: e.message,
    });
  }
};

// Get All Food
const getFoods = async (req, res) => {
  try {
    const { search } = req.query;

    let foods;

    if (search) {
      foods = await searchFood(search);
    } else {
      foods = await getAllFood();
    }

    res.status(200).json({
      message: "Food Fetch Successful",
      foods,
    });
  } catch (e) {
    res.status(500).json({
      message: "Fetch Failed",
      e: e.message,
    });
  }
};

// Get Food By ID
const getFoodByID = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await getFoodById(id);

    if (!food) {
      return res.status(404).json({
        message: "Food Not Found",
      });
    }

    res.status(200).json({
      message: "Food Found",
      food,
    });
  } catch (e) {
    res.status(500).json({
      message: "Fetch Failed",
      e: e.message,
    });
  }
};

// Delete Food
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteFoodById(id);

    res.status(200).json({
      message: "Food Deleted Successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Delete Failed",
      e: e.message,
    });
  }
};

// Update Food
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    const { foodname, description, price, category } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!foodname || !description || !price || !category) {
      return res.status(400).json({
        message: "Field Empty",
      });
    }

    const food = await updateFoodById(
      id,
      foodname,
      description,
      price,
      category,
      image
    );

    res.status(200).json({
      message: "Food Updated Successfully",
      food,
    });
  } catch (e) {
    res.status(500).json({
      message: "Update Failed",
      e: e.message,
    });
  }
};

module.exports = {
  addFood,
  getFoods,
  getFoodByID,
  deleteFood,
  updateFood,
};