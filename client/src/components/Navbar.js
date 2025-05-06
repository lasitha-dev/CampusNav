import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Container>
        <Toolbar>
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            CAMPUS NAV
          </Typography>

          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/"
              sx={{ mx: 1 }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/buildings"
              sx={{ mx: 1 }}
            >
              Buildings
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/halls"
              sx={{ mx: 1 }}
            >
              Halls
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 