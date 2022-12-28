const express = require('express');
const router = express.Router();
const { getExtMember, getExtMembers, addExtMember, updateExtMember, deleteExtMember } = require('../controller/extmember');

router.get('/', getExtMembers);

router.get('/:id', getExtMember);

router.post('/', addExtMember);

router.delete('/:id', deleteExtMember);

router.put('/:id', updateExtMember);

module.exports = router;