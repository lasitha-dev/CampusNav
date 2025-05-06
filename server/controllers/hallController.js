const Hall = require('../models/Hall');
const Building = require('../models/Building');

// @desc    Get all halls
// @route   GET /api/halls
// @access  Public
exports.getHalls = async (req, res) => {
  try {
    const halls = await Hall.find()
      .sort({ createdAt: -1 })
      .populate('building', 'name');
    
    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get halls by building
// @route   GET /api/halls/building/:buildingId
// @access  Public
exports.getHallsByBuilding = async (req, res) => {
  try {
    const buildingId = req.params.buildingId;
    
    // Verify if building exists
    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }
    
    const halls = await Hall.find({ building: buildingId })
      .sort({ createdAt: -1 })
      .populate('building', 'name');
    
    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single hall
// @route   GET /api/halls/:id
// @access  Public
exports.getHall = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id)
      .populate('building', 'name location description imageUrl');
    
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    
    res.status(200).json(hall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a hall
// @route   POST /api/halls
// @access  Public
exports.createHall = async (req, res) => {
  try {
    const { 
      name, 
      roomNumber, 
      floor, 
      capacity, 
      building, 
      description, 
      imageUrl 
    } = req.body;
    
    // Verify if building exists
    const buildingExists = await Building.findById(building);
    if (!buildingExists) {
      return res.status(404).json({ message: 'Building not found' });
    }
    
    const hall = new Hall({
      name,
      roomNumber,
      floor,
      capacity,
      building,
      description,
      imageUrl
    });
    
    const savedHall = await hall.save();
    res.status(201).json(savedHall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update hall
// @route   PUT /api/halls/:id
// @access  Public
exports.updateHall = async (req, res) => {
  try {
    const { 
      name, 
      roomNumber, 
      floor, 
      capacity, 
      building, 
      description, 
      imageUrl 
    } = req.body;
    
    // Verify if building exists
    if (building) {
      const buildingExists = await Building.findById(building);
      if (!buildingExists) {
        return res.status(404).json({ message: 'Building not found' });
      }
    }
    
    const updatedHall = await Hall.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        roomNumber, 
        floor, 
        capacity, 
        building, 
        description, 
        imageUrl 
      },
      { new: true, runValidators: true }
    ).populate('building', 'name');
    
    if (!updatedHall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    
    res.status(200).json(updatedHall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete hall
// @route   DELETE /api/halls/:id
// @access  Public
exports.deleteHall = async (req, res) => {
  try {
    const hall = await Hall.findByIdAndDelete(req.params.id);
    
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    
    res.status(200).json({ message: 'Hall deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 