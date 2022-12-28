const express = require('express');
const router = express.Router();
const { getPayments, getPayment, addPayment, updatePayment, deletePayment  } = require('../controller/payments');

router.get('/', getPayments);

router.get('/:id', getPayment);

router.post('/', addPayment);

router.put('/:id', updatePayment);

router.delete('/:id', deletePayment);

module.exports = router; 