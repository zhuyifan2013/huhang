const express = require('express');
const router = express.Router();

router.use('/school', require('./school'))
router.use('/senior', require('./senior'))
router.use('/user', require('./users'))

module.exports = router;
