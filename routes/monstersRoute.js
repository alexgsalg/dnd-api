const express = require('express');
const router = express.Router();

////////////////// CONTROLLERS //////////////////
const monstersControllers = require('../controllers/monstersController');

router.param('index', monstersControllers.checkIndex);

////////////////// ROUTES //////////////////
router.route('/').get(monstersControllers.getAllMonsters);
router.route('/:index').get(monstersControllers.getMonsterByIndex);

module.exports = router;