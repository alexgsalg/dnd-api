const express = require('express');
const router = express.Router();

////////////////// CONTROLLERS //////////////////
const equipmentsControllers = require('../controllers/equipmentsController');

router.param('index', equipmentsControllers.checkIndex);

////////////////// ROUTES //////////////////
router.route('/').get(equipmentsControllers.getAllEquipments);
router.route('/:index').get(equipmentsControllers.getEquipmentByIndex);

module.exports = router;