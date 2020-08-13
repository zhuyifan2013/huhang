const express = require('express');
const router = express.Router();

router.use('/school', require('./school'))
router.use('/senior', require('./senior'))
router.use('/user', require('./users'))
router.use('/study_group', require('./study_group'))

module.exports = router;
