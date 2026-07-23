const {
  createCategory,
  getAllCategory,
  searchCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} = require("../model/categoryModel");

const addCategory = async (req, res) => {
  try {

    const { name } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!name || !image) {
      return res.status(400).json({
        message: "All Fields Required",
      });
    }

    const category = await createCategory(
      name,
      image
    );

    res.status(201).json({
      message: "Category Added",
      category,
    });

  } catch (e) {

    res.status(500).json({
      message: e.message,
    });

  }
};

const getCategories = async (req, res) => {

  try {

    const { search } = req.query;

    let category;

    if (search) {
      category = await searchCategory(search);
    } else {
      category = await getAllCategory();
    }

    res.status(200).json({
      message: "Success",
      category,
    });

  } catch (e) {

    res.status(500).json({
      message: e.message,
    });

  }

};

const getCategoryByIDDB = async (req, res) => {

  try {

    const category = await getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category Not Found",
      });
    }

    res.status(200).json({
      message: "Success",
      category,
    });

  } catch (e) {

    res.status(500).json({
      message: e.message,
    });

  }

};

const deleteCategoryIDDB = async (req, res) => {

  try {

    await deleteCategoryById(req.params.id);

    res.status(200).json({
      message: "Deleted Successfully",
    });

  } catch (e) {

    res.status(500).json({
      message: e.message,
    });

  }

};

const updateCategoryIDDB = async (req, res) => {

  try {

    const { name } = req.body;

    const image = req.file
      ? req.file.filename
      : null;

    const category =
      await updateCategoryById(
        req.params.id,
        name,
        image
      );

    res.status(200).json({
      message: "Updated Successfully",
      category,
    });

  } catch (e) {

    res.status(500).json({
      message: e.message,
    });

  }

};

module.exports = {
  addCategory,
  getCategories,
  getCategoryByIDDB,
  deleteCategoryIDDB,
  updateCategoryIDDB,
};