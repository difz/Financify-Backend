const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  categoryType: {
    type: String,
    enum: ['pemasukan', 'pengeluaran', 'akun'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryModel = mongoose.model('Category', categorySchema);

const createCategory = (categoryData) => {
  return new CategoryModel(categoryData).save().then((category) => category.toObject());
};

const getCategoriesByUser = (userId) => {
  return CategoryModel.find({ userId });
};

const deleteCategory = (id) => {
  return CategoryModel.findOneAndDelete({ _id: id });
};

module.exports = {
  createCategory,
  getCategoriesByUser,
  deleteCategory,
};
