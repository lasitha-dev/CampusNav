import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import HallCard from '../components/HallCard';
import { 
  getHalls, 
  createHall, 
  updateHall, 
  deleteHall, 
  getBuildings 
} from '../services/api';

const HallsPage = () => {
  const [halls, setHalls] = useState([]);
  const [filteredHalls, setFilteredHalls] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [buildingFilter, setBuildingFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentHall, setCurrentHall] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    floor: '',
    capacity: '',
    description: '',
    imageUrl: '',
    building: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchBuildings();
    fetchHalls();
  }, []);

  const fetchBuildings = async () => {
    try {
      const data = await getBuildings();
      setBuildings(data);
    } catch (error) {
      showSnackbar('Error fetching buildings', 'error');
    }
  };

  const fetchHalls = async () => {
    try {
      setLoading(true);
      const data = await getHalls();
      setHalls(data);
      setFilteredHalls(data);
    } catch (error) {
      showSnackbar('Error fetching halls', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOpenDialog = (hall = null) => {
    if (hall) {
      setCurrentHall(hall);
      setFormData({
        name: hall.name,
        roomNumber: hall.roomNumber,
        floor: hall.floor,
        capacity: hall.capacity,
        description: hall.description,
        imageUrl: hall.imageUrl,
        building: hall.building._id
      });
    } else {
      setCurrentHall(null);
      setFormData({
        name: '',
        roomNumber: '',
        floor: '',
        capacity: '',
        description: '',
        imageUrl: '',
        building: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFilter = () => {
    let filtered = [...halls];
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(hall => 
        hall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hall.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hall.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (buildingFilter) {
      filtered = filtered.filter(hall => hall.building._id === buildingFilter);
    }
    
    setFilteredHalls(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setBuildingFilter('');
    setFilteredHalls(halls);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const handleSubmit = async () => {
    try {
      const hallData = {
        ...formData,
        floor: Number(formData.floor),
        capacity: Number(formData.capacity)
      };

      if (currentHall) {
        // Update existing hall
        await updateHall(currentHall._id, hallData);
        showSnackbar('Hall updated successfully');
      } else {
        // Create new hall
        await createHall(hallData);
        showSnackbar('Hall created successfully');
      }
      fetchHalls();
      handleCloseDialog();
    } catch (error) {
      showSnackbar(
        `Error ${currentHall ? 'updating' : 'creating'} hall`,
        'error'
      );
    }
  };

  const handleDelete = async (hallId) => {
    if (window.confirm('Are you sure you want to delete this hall?')) {
      try {
        await deleteHall(hallId);
        showSnackbar('Hall deleted successfully');
        fetchHalls();
      } catch (error) {
        showSnackbar('Error deleting hall', 'error');
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.roomNumber &&
      formData.floor &&
      formData.capacity &&
      formData.description &&
      formData.imageUrl &&
      formData.building
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Manage Halls
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Add, edit or delete lecture halls
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 4 }} elevation={2}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: { xs: '100%', md: '70%' } }}>
            <FormControl sx={{ width: { xs: '100%', sm: '60%' } }} variant="outlined">
              <InputLabel htmlFor="search-input">Search halls</InputLabel>
              <OutlinedInput
                id="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                endAdornment={
                  <InputAdornment position="end">
                    {searchQuery && (
                      <IconButton
                        aria-label="clear search"
                        onClick={() => {
                          setSearchQuery('');
                          handleFilter();
                        }}
                        edge="end"
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="search halls"
                      onClick={handleFilter}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search halls"
              />
            </FormControl>

            <FormControl sx={{ width: { xs: '100%', sm: '40%' } }}>
              <InputLabel id="building-filter-label">Filter by Building</InputLabel>
              <Select
                labelId="building-filter-label"
                id="building-filter"
                value={buildingFilter}
                label="Filter by Building"
                onChange={(e) => {
                  setBuildingFilter(e.target.value);
                  setTimeout(handleFilter, 0);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">
                  <em>All Buildings</em>
                </MenuItem>
                {buildings.map((building) => (
                  <MenuItem key={building._id} value={building._id}>
                    {building.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
            {(searchQuery || buildingFilter) && (
              <Button 
                variant="outlined" 
                onClick={clearFilters}
                startIcon={<ClearIcon />}
              >
                Clear Filters
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              Add Hall
            </Button>
          </Box>
        </Box>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredHalls.length === 0 ? (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6">No halls found</Typography>
          <Typography variant="body2">
            {searchQuery || buildingFilter
              ? 'Try different filters or add a new hall.'
              : 'Click "Add Hall" to add a new hall.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {filteredHalls.map((hall) => (
            <Grid item key={hall._id} xs={12} sm={6} md={4}>
              <HallCard
                hall={hall}
                onEdit={() => handleOpenDialog(hall)}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Hall Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentHall ? 'Edit Hall' : 'Add New Hall'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Hall Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="roomNumber"
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="floor"
                label="Floor"
                name="floor"
                type="number"
                value={formData.floor}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="capacity"
                label="Capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleInputChange}
              />
            </Box>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="building-label">Building</InputLabel>
              <Select
                labelId="building-label"
                id="building"
                name="building"
                value={formData.building}
                label="Building"
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>Select a building</em>
                </MenuItem>
                {buildings.map((building) => (
                  <MenuItem key={building._id} value={building._id}>
                    {building.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="imageUrl"
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              helperText="Enter a URL for the hall image"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!isFormValid()}
          >
            {currentHall ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HallsPage; 