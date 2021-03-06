const express = require('express');
const router = express.Router();

////////////////// CONTROLLERS //////////////////
const spellsControllers = require('../controllers/spellsController');

router.param('index', spellsControllers.checkIndex);

////////////////// ROUTES //////////////////
router.route('/').get(spellsControllers.getAllSpells);
router.route('/:index').get(spellsControllers.getSpellByIndex);
// Class spells
router.route('/class/:index').get(spellsControllers.getSpellsByClass);

module.exports = router;