import React, {useState} from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import BoltIcon from '@mui/icons-material/Bolt';
import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { NotificationAdd } from '@mui/icons-material';
import {
    AppBar,
    Avatar,
   Menu,
    MenuItem,
    Toolbar
  } from "@mui/material";

  
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });
  
  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: "20%",
    width: "40%",
  }));
  
  const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
      display: "flex",
   
}));
  
  const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    
   }));


const Navbar = () => {

    const [open, setOpen] = useState(false);
    return (
        <AppBar position="sticky">
        <StyledToolbar>
          <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
            TecNexus
          </Typography>
          <BoltIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Search>
            <InputBase placeholder="search..." />
          </Search>
          <Icons>
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
            <Badge badgeContent={2} color="error">
              <NotificationAdd />
            </Badge>
            
          </Icons>
          <UserBox onClick={(e) => setOpen(true)}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <Typography variant="span">John</Typography>
          </UserBox>
        </StyledToolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>Perfil</MenuItem>
          <MenuItem>Mi Cuenta</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
        </AppBar>
    );

};

export default Navbar;