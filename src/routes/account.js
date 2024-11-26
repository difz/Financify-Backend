const express = require('express');

const router = express.Router();

const accountController = require('../controllers/account');
const auth = require('../middlewares/authentication');

router.post('/create', auth.ensureLogin, accountController.createUserNewAccount);
router.get('/all', auth.ensureLogin, accountController.getAllAccounts);
router.get('/name/:accountName', auth.ensureLogin, accountController.getUserAccountByName);
router.patch('/update/:id', auth.ensureLogin, accountController.updateUserAccount);
router.delete('/delete/:id', auth.ensureLogin, accountController.deleteUserAccount);
router.get('/:id', auth.ensureLogin, accountController.getUserAccountById);
router.patch('/transfer', auth.ensureLogin, accountController.transferAccount);

module.exports = router;

