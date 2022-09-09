const express = require('express');
const router = express.Router();
const { getPolicies, getPolicy, addPolicy, updatePolicy, deletePolicy } = require('../controller/policy');

router.get('/', getPolicies);

router.get('/:id', getPolicy);

router.post('/', addPolicy);

router.put('/:id', updatePolicy);

router.delete('/:id', deletePolicy);

module.exports = router; 