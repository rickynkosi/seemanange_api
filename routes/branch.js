const express = require('express');
const router = express.Router();
const { getBranch, getBranches, addBranch, updateBranch, deletebranch } = require('../controller/branch');

router.get('/', getBranches);

router.get('/:id', getBranch);

router.post('/', addBranch);

router.delete('/:id', deletebranch);

router.put('/:id', updateBranch);

module.exports = router;