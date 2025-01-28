import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box } from '@mui/material';
import { Home, ShoppingCart, ContactMail } from '@mui/icons-material'; // Import icons
import { Link, useLocation } from 'react-router-dom';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
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
          bgcolor : ['#F8F1E4']
        },
      }}
    >
      
      <Box style={{ padding: '16px', fontWeight: 'bold', fontSize: '18px', bgcolor : ['#92817A'] }}>
        My Application
      </Box>
      <Divider />
      <List>
        <ListItem component={Link} to="/Client" className={location.pathname == "/Client" ? "bg-slate-200" :null } >
          <ListItemIcon>
            <StoreRoundedIcon/>
          </ListItemIcon>
          <ListItemText primary="Client" />
        </ListItem>
        <ListItem component={Link} to="/Produit" className={location.pathname == "/Produit" ? "bg-slate-200" :null }>
          <ListItemIcon>
            < LocalOfferRoundedIcon/>
          </ListItemIcon>
          <ListItemText primary="Produit" />
        </ListItem>
        <ListItem component={Link} to="/Commande" className={location.pathname == "/Commande" ? "bg-slate-200" :null }>
          <ListItemIcon>
            <ShoppingCart /> 
          </ListItemIcon>
          <ListItemText primary="Commande" />
        </ListItem>
          <ListItem component={Link} to="/Profile" className={location.pathname == "/Profile" ? "bg-slate-200" :null }>
          <ListItemIcon>
            <ContactMail /> 
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
       </List>
      <Divider />
    </Drawer>
  );
}
export default DrawerLeft;