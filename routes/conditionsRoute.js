const express = require('express');
const router = express.Router();

////////////////// CONTROLLERS //////////////////
const conditionsControllers = require('../controllers/conditionsController');

router.param('index', conditionsControllers.checkIndex);

////////////////// ROUTES //////////////////
router.route('/').get(conditionsControllers.getAllConditions);
router.route('/:index').get(conditionsControllers.getConditionByIndex);

module.exports = router;