
const express = require('express');
const router = express.Router();
const { getCashfuneral, getCashfunerals, addCashfuneral, updateCashfuneral, deleteCashfuneral } = require('../models/cashfuneralmodel');
// const lodash = require('lodash');
// const {Cash, validate} = require('../models/cashfuneralmodel');
// const admin = require('../middleware/admin');

router.get('/', getCashfunerals);

router.get('/:id', getCashfuneral);

router.post('/', addCashfuneral);

router.put('/:id', updateCashfuneral);

router.delete('/:id', deleteCashfuneral);

module.exports = router;