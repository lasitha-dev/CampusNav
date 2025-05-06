import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  Paper,
  Breadcrumbs,
  Link,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HallCard from '../components/HallCard';
import { getBuilding, getHallsByBuilding } from '../services/api';

const BuildingHallsPage = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState(null);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const buildingData = await getBuilding(buildingId);
        setBuilding(buildingData);
        
        const hallsData = await getHallsByBuilding(buildingId);
        setHalls(hallsData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load building or halls. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [buildingId]);

  const handleAddHall = () => {
    navigate('/halls', { state: { preselectedBuilding: buildingId } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoToBuildings = () => {
    navigate('/buildings');
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{error}</Alert>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />}>
              Go Back
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link 
            underline="hover" 
            color="inherit" 
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={handleGoToBuildings}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <ApartmentIcon sx={{ mr: 0.5 }} fontSize="small" />
            Buildings
          </Link>
          <Typography color="text.primary">
            {building?.name}
          </Typography>
        </Breadcrumbs>

        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Paper 
          sx={{ 
            p: 3, 
            mb: 4, 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${building?.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            position: 'relative'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              {building?.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {building?.location}
            </Typography>
            <Typography variant="body1" paragraph sx={{ maxWidth: '80%' }}>
              {building?.description}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />} 
              onClick={handleAddHall}
            >
              Add New Hall
            </Button>
          </Box>
        </Paper>

        <Typography variant="h4" gutterBottom sx={{ mt: 6, fontWeight: 'bold' }}>
          Halls in {building?.name}
        </Typography>

        {halls.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No halls found in this building
            </Typography>
            <Typography variant="body2" paragraph>
              Click the button below to add a new hall to this building.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />} 
              onClick={handleAddHall}
            >
              Add New Hall
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {halls.map((hall) => (
              <Grid item key={hall._id} xs={12} sm={6} md={4}>
                <HallCard hall={hall} showActions={false} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default BuildingHallsPage; 