import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "hooks/auth";
import { useNavigate } from "react-router-dom";

const Sidebar = ({mode,setMode}) => {
  const navigate = useNavigate();
  const {user, isLoading} = useAuth();

  if(isLoading) return "Loading..."
  const navigateToFriends = () =>{ 
    
    navigate('/friends?matricula='+user?.matricula+'')

  }
  const navigateToProfile = () =>{ 
    
    navigate('/profile?matricula='+user?.matricula+'')

  }

  const navigateToFeed = () =>{
    navigate('/App?matricula='+user?.matricula+'')
  }



  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={navigateToFeed}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Pages" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="https://market.tec.mx" >
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={navigateToFriends}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={navigateToProfile}>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
