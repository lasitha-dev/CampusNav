const Building = require('../models/Building');

// @desc    Get all buildings
// @route   GET /api/buildings
// @access  Public
exports.getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find().sort({ createdAt: -1 });
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single building
// @route   GET /api/buildings/:id
// @access  Public
exports.getBuilding = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }
    
    res.status(200).json(building);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a building
// @route   POST /api/buildings
// @access  Public
exports.createBuilding = async (req, res) => {
  try {
    const { name, description, location, imageUrl } = req.body;
    
    const building = new Building({
      name,
      description,
      location,
      imageUrl
    });
    
    const savedBuilding = await building.save();
    res.status(201).json(savedBuilding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update building
// @route   PUT /api/buildings/:id
// @access  Public
exports.updateBuilding = async (req, res) => {
  try {
    const { name, description, location, imageUrl } = req.body;
    
    const updatedBuilding = await Building.findByIdAndUpdate(
      req.params.id,
      { name, description, location, imageUrl },
      { new: true, runValidators: true }
    );
    
    if (!updatedBuilding) {
      return res.status(404).json({ message: 'Building not found' });
    }
    
    res.status(200).json(updatedBuilding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete building
// @route   DELETE /api/buildings/:id
// @access  Public
exports.deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);
    
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }
    
    res.status(200).json({ message: 'Building deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 