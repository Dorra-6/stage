import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Home, ShoppingCart, ContactMail } from '@mui/icons-material'; // Import icons
import { Link, useLocation } from 'react-router-dom';

function DrawerLeft() {
  let location = useLocation();
  console.log(location)
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
        <ListItem component={Link} to="/Client" className={location.pathname == "/Client" ? "bg-slate-200" :null } >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Client" />
        </ListItem>
        <ListItem component={Link} to="/Produit" className={location.pathname == "/Produit" ? "bg-slate-200" :null }>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Produit" />
        </ListItem>
        <ListItem component={Link} to="/Commande" className={location.pathname == "/Commande" ? "bg-slate-200" :null }>
          <ListItemIcon>
            <ShoppingCart /> 
          </ListItemIcon>
          <ListItemText primary="Commande" />
        </ListItem>
          <ListItem component={Link} to="/contact" className={location.pathname == "/contact" ? "bg-slate-200" :null }>
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