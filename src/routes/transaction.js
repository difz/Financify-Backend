const express = require('express');

const router = express.Router();

const transactionController = require('../controllers/transaction');
const auth = require('../middlewares/authentication');


router.post('/create', auth.ensureLogin, transactionController.createNewTransaction);
router.patch('/update/:id', auth.ensureLogin, transactionController.updateTransactionById);
router.delete('/delete/:id', auth.ensureLogin, transactionController.deleteSelectTransaction);
router.use("/history", require("./historyTransaction"));

module.exports = router;