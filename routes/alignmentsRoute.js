const express = require('express');
const router = express.Router();

////////////////// CONTROLLERS //////////////////
const alignmentsControllers = require('../controllers/alignmentsController');

router.param('index', alignmentsControllers.checkIndex);

////////////////// ROUTES //////////////////
router.route('/').get(alignmentsControllers.getAllAlignments);
router.route('/:index').get(alignmentsControllers.getAlignmentByIndex);

module.exports = router;