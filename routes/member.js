const express = require('express');
const router = express.Router();
const { getMembers, getMember, addMember, updateMember, deleteMember  } = require('../controller/member');

router.get('/', getMembers);

router.get('/:id', getMember);

router.post('/', addMember);

router.put('/:id', updateMember);

router.delete('/:id', deleteMember);

module.exports = router; 