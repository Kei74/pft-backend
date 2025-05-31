const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyAuth } = require('../services/authService')

router.post('/transactions', verifyAuth, transactionController.postTransaction);
router.get('/transactions', verifyAuth, transactionController.getAllTransactions);
router.delete('/transactions/:id', verifyAuth, transactionController.deleteTransactionById)

module.exports = router;
