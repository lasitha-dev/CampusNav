const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');

// @route   GET & POST /api/halls
router.route('/')
  .get(hallController.getHalls)
  .post(hallController.createHall);

// @route   GET /api/halls/building/:buildingId
router.route('/building/:buildingId')
  .get(hallController.getHallsByBuilding);

// @route   GET & PUT & DELETE /api/halls/:id
router.route('/:id')
  .get(hallController.getHall)
  .put(hallController.updateHall)
  .delete(hallController.deleteHall);

module.exports = router; 