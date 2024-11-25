const express = require('express');

const router = express.Router();

const transactionController = require('../controllers/transaction');
const auth = require('../middlewares/authentication');

router.get('/', auth.ensureLogin, transactionController.getAllTransactions);
router.get('/account/:account', auth.ensureLogin, transactionController.getAllTransactionByAccount);
router.get('/type/:type', auth.ensureLogin, transactionController.getAllTransactionByType);
router.get('/category/:category', auth.ensureLogin, transactionController.getAllTransactionByCategory);

module.exports = router;