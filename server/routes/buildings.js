const express = require('express');
const router = express.Router();
const buildingController = require('../controllers/buildingController');

// @route   GET & POST /api/buildings
router.route('/')
  .get(buildingController.getBuildings)
  .post(buildingController.createBuilding);

// @route   GET & PUT & DELETE /api/buildings/:id
router.route('/:id')
  .get(buildingController.getBuilding)
  .put(buildingController.updateBuilding)
  .delete(buildingController.deleteBuilding);

module.exports = router; 