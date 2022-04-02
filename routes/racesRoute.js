const express = require('express');
const router = express.Router();

////////////////// CONTROLLERS //////////////////
const racesControllers = require('../controllers/racesController');

router.param('index', racesControllers.checkIndex);

////////////////// ROUTES //////////////////
router.route('/').get(racesControllers.getAllRaces);
router.route('/:index').get(racesControllers.getRaceByIndex);

module.exports = router;