const express = require('express');
const router = express.Router();

////////////////// CONTROLLERS //////////////////
const rulesControllers = require('../controllers/rulesController');

router.param('index', rulesControllers.checkIndex);

////////////////// ROUTES //////////////////
router.route('/').get(rulesControllers.getAllRules);
router.route('/:index').get(rulesControllers.getRuleByIndex);

module.exports = router;