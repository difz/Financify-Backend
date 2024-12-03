const { createCategory, getCategoriesByUser, deleteCategory } = require('../models/category');

const createNewCategory = async (req, res) => {

  try {
    const { categoryName, categoryType } = req.body;
    const userId = req.user._id;

    if (!categoryName || !categoryType) {
      return res.status(400).json({
        message: 'Category name and type are required',
      });
    }

    const newCategory = await createCategory({
      userId,
      categoryName,
      categoryType,
    });

    return res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getUserCategories = async (req, res) => {

  try {
    const userId = req.user._id;
    const categories = await getCategoriesByUser(userId);

    return res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUserCategory = async (req, res) => {

  try {
    const { id } = req.params;
    const userId = req.user._id;

    const category = await deleteCategory(id);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    if (category.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }

    return res.status(200).json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNewCategory,
  getUserCategories,
  deleteUserCategory,
};
