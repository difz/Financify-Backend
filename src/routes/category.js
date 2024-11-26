const express = require('express');
const categoryController = require('../controllers/category');
const auth = require('../middlewares/authentication');

const router = express.Router();

// Rute untuk membuat kategori baru
router.post('/create', auth.ensureLogin, categoryController.createNewCategory);

// Rute untuk mendapatkan semua kategori pengguna
router.get('/all', auth.ensureLogin, categoryController.getUserCategories);

// Rute untuk menghapus kategori berdasarkan ID
router.delete('/delete/:id', auth.ensureLogin, categoryController.deleteUserCategory);

module.exports = router;
