const express = require('express');

const router = express.Router();

const transactionController = require('../controllers/transaction');
const auth = require('../middlewares/authentication');

router.post('/create', auth.ensureLogin, transactionController.createNewTransaction);
router.put('/transaction/:id', auth.ensureLogin, transactionController.updateTransaction);
router.delete('/transaction/:id', auth.ensureLogin, transactionController.deleteTransaction);
router.use("/history", require("./historyTransaction"));

module.exports = router;