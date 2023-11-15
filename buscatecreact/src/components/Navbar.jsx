import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {useAuth, useLogout} from "hooks/auth"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import { GetUser } from "hooks/search";
import { db } from "lib/firebase";
import { collection, getDocs } from "firebase/firestore"; 
import { createPopper } from '@popperjs/core';


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  
  const {logout, isLog} = useLogout();
  const [open, setOpen] = useState(false);
  const [area_open, setAreaOpen] = useState(false);
  const {user, isLoading} = useAuth();
  const [area, setArea] = useState("");
  const navigate = useNavigate();

  if(isLoading) return "Loading..."

  const navigateToProfile = () =>{ 
    
    navigate('/profile?matricula='+user?.matricula+'')

  }


  const getUser = () => {
    const data = document.getElementById("search_field").value;
    console.log("matricula " +  data);
    const getFromFirebase = collection(db,"users");
    

    getDocs(getFromFirebase).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().matricula);
        if(doc.data().matricula.toLowerCase() === data.toLowerCase()){
          console.log("encontrado" + doc.data().matricula);
        }
      });
    });
    console.log("datos");

  }


  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          {user?.matricula}
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search >
          <InputBase id= "search_field" placeholder="search..." />
        </Search>
        <div>
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setAreaOpen(true)}
          />
        </Icons>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={area_open}
        onClose={(e) => setAreaOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={(e) => setArea("skills")}>Habilidad</MenuItem>
        <MenuItem onClick={(e) => setArea("matricula")}>Matricula</MenuItem>
      </Menu>
      </div>

        <Button onClick={(e) => getUser()}>Buscar</Button>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
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
        <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
