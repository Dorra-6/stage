import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Home, ShoppingCart, ContactMail } from '@mui/icons-material'; // Import icons
import { Link } from 'react-router-dom';

function DrawerLeft() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
    >
      
      <div style={{ padding: '16px', fontWeight: 'bold', fontSize: '18px' }}>
        My Application
      </div>
      <Divider />
      <List>
        <ListItem component={Link} to="/Client">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Client" />
        </ListItem>
        <ListItem component={Link} to="/Commande">
          <ListItemIcon>
            <ShoppingCart /> 
          </ListItemIcon>
          <ListItemText primary="Commande" />
        </ListItem>
          <ListItem component={Link} to="/contact">
          <ListItemIcon>
            <ContactMail /> 
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
       </List>
      <Divider />
    </Drawer>
  );
}
export default DrawerLeft;