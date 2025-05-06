import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Paper, 
  Button,
  InputBase,
  IconButton,
  Divider
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import BuildingCard from '../components/BuildingCard';
import { getBuildings } from '../services/api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await getBuildings();
        setBuildings(data);
        setFilteredBuildings(data);
      } catch (error) {
        console.error('Error fetching buildings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = buildings.filter(building => 
      building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBuildings(filtered);
  };

  const handleManageBuildings = () => {
    navigate('/buildings');
  };

  const handleManageHalls = () => {
    navigate('/halls');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Campus Navigation
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Find your way around campus buildings and lecture halls
        </Typography>
      </Box>

      <Paper
        component="form"
        sx={{ 
          p: '2px 4px', 
          display: 'flex', 
          alignItems: 'center', 
          width: { xs: '100%', md: '80%' },
          mx: 'auto',
          mb: 5,
          borderRadius: 3
        }}
        elevation={3}
        onSubmit={handleSearch}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search buildings by name, location or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleManageBuildings}
          startIcon={<SchoolIcon />}
        >
          Manage Buildings
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleManageHalls}
        >
          Manage Halls
        </Button>
      </Box>

      <Grid container spacing={4}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
            <Typography>Loading buildings...</Typography>
          </Box>
        ) : filteredBuildings.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
            <Typography>No buildings found. Try a different search or add a new building.</Typography>
          </Box>
        ) : (
          filteredBuildings.map((building) => (
            <Grid item key={building._id} xs={12} sm={6} md={4}>
              <BuildingCard building={building} showActions={false} />
            </Grid>
          ))
        )}
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          About Campus Navigation
        </Typography>
        <Typography variant="body1" paragraph>
          The Campus Navigation application helps new students find their way around campus.
          Easily locate buildings and lecture halls for your classes and exams.
        </Typography>
        <Typography variant="body1">
          Browse through buildings, check out lecture halls, and never get lost on campus again!
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage; 