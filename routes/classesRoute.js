const express = require('express');
const router = express.Router();

////////////////// CONTROLLERS //////////////////
const classesControllers = require('../controllers/classesController');

router.param('index', classesControllers.checkIndex);

////////////////// ROUTES //////////////////
router.route('/').get(classesControllers.getAllClasses);
router.route('/:index').get(classesControllers.getClassByIndex);

module.exports = router;