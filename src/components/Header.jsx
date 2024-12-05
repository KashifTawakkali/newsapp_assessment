import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; 

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate from react-router-dom

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => navigate('/')}> {/* On Home click, navigate to home */}
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="About" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #FF4081, #D5006C)' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {/* Left Section: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/')} // Navigate to home when the logo is clicked
          >
            NewsApp
          </Typography>
        </Box>

        {/* Right Section: Navigation Buttons */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button> 
          <Button
            color="inherit"
            component="a"
            href="https://3d-portfolio-pink-omega.vercel.app/"
            target="_blank"
          >
            About
          </Button> {/* Open About in a new tab */}
          <Button 
           color="inherit"
           component="a"
           href="https://3d-portfolio-pink-omega.vercel.app/contact"
           target="_blank"
          >Contact Me</Button>
        </Box>

        {/* Burger Menu for Mobile */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'flex', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer Component */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Header;
