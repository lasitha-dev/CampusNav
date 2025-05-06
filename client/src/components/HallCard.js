import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
  Chip
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FloorIcon from '@mui/icons-material/Layers';

const HallCard = ({ hall, onEdit, onDelete, showActions = true }) => {
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
        image={hall.imageUrl}
        alt={hall.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
          {hall.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <MeetingRoomIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Room: {hall.roomNumber}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FloorIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Floor: {hall.floor}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PeopleIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Capacity: {hall.capacity} people
          </Typography>
        </Box>
        
        {hall.building && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ApartmentIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Chip 
              label={hall.building.name} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          </Box>
        )}
        
        <Typography variant="body2" color="text.primary" paragraph>
          {hall.description}
        </Typography>
      </CardContent>
      
      {showActions && (
        <CardActions>
          <Button size="small" color="info" onClick={() => onEdit(hall)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => onDelete(hall._id)}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default HallCard; 