const express = require('express');
const router = express.Router();
const { getDistrict, getDistricts, addDistrict, updateDistrict, deleteDistrict } = require('../controller/district');

router.get('/', getDistricts);

router.get('/:id', getDistrict);

router.post('/', addDistrict);

router.delete('/:id', deleteDistrict);

router.put('/:id', updateDistrict);

module.exports = router;