import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const BuildingCard = ({ building, onEdit, onDelete, showActions = true }) => {
  const navigate = useNavigate();

  const handleViewHalls = () => {
    navigate(`/building/${building._id}/halls`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={building.imageUrl}
        alt={building.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
          {building.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {building.location}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.primary" paragraph>
          {building.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          onClick={handleViewHalls}
          startIcon={<MeetingRoomIcon />}
        >
          View Halls
        </Button>
        {showActions && (
          <>
            <Button size="small" color="info" onClick={() => onEdit(building)}>
              Edit
            </Button>
            <Button size="small" color="error" onClick={() => onDelete(building._id)}>
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default BuildingCard; 