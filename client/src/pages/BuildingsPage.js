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
  InputAdornment,
  IconButton,
  OutlinedInput,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import BuildingCard from '../components/BuildingCard';
import { getBuildings, createBuilding, updateBuilding, deleteBuilding } from '../services/api';

const BuildingsPage = () => {
  const [buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    imageUrl: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const data = await getBuildings();
      setBuildings(data);
      setFilteredBuildings(data);
    } catch (error) {
      showSnackbar('Error fetching buildings', 'error');
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

  const handleOpenDialog = (building = null) => {
    if (building) {
      setCurrentBuilding(building);
      setFormData({
        name: building.name,
        description: building.description,
        location: building.location,
        imageUrl: building.imageUrl
      });
    } else {
      setCurrentBuilding(null);
      setFormData({
        name: '',
        description: '',
        location: '',
        imageUrl: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredBuildings(buildings);
      return;
    }
    
    const filtered = buildings.filter(building => 
      building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBuildings(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredBuildings(buildings);
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
      if (currentBuilding) {
        // Update existing building
        await updateBuilding(currentBuilding._id, formData);
        showSnackbar('Building updated successfully');
      } else {
        // Create new building
        await createBuilding(formData);
        showSnackbar('Building created successfully');
      }
      fetchBuildings();
      handleCloseDialog();
    } catch (error) {
      showSnackbar(
        `Error ${currentBuilding ? 'updating' : 'creating'} building`,
        'error'
      );
    }
  };

  const handleDelete = async (buildingId) => {
    if (window.confirm('Are you sure you want to delete this building?')) {
      try {
        await deleteBuilding(buildingId);
        showSnackbar('Building deleted successfully');
        fetchBuildings();
      } catch (error) {
        showSnackbar('Error deleting building', 'error');
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Manage Buildings
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Add, edit or delete campus buildings
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 4 }} elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <FormControl sx={{ width: { xs: '100%', sm: '60%' } }} variant="outlined">
            <InputLabel htmlFor="search-input">Search buildings</InputLabel>
            <OutlinedInput
              id="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              endAdornment={
                <InputAdornment position="end">
                  {searchQuery && (
                    <IconButton
                      aria-label="clear search"
                      onClick={clearSearch}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="search buildings"
                    onClick={handleSearch}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Search buildings"
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Building
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredBuildings.length === 0 ? (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6">No buildings found</Typography>
          <Typography variant="body2">
            {searchQuery
              ? 'Try a different search query or add a new building.'
              : 'Click "Add Building" to add a new building.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {filteredBuildings.map((building) => (
            <Grid item key={building._id} xs={12} sm={6} md={4}>
              <BuildingCard
                building={building}
                onEdit={() => handleOpenDialog(building)}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Building Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentBuilding ? 'Edit Building' : 'Add New Building'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Building Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
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
              helperText="Enter a URL for the building image"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.name || !formData.location || !formData.description || !formData.imageUrl}
          >
            {currentBuilding ? 'Update' : 'Create'}
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

export default BuildingsPage; 