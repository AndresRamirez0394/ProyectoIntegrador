import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Select,
  styled,
  Toolbar,
  Typography,
  OutlinedInput,
} from "@mui/material";
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import {useAuth, useLogout} from "hooks/auth"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import { GetUser } from "hooks/search";
import { db } from "lib/firebase";
import { collection, getDocs } from "firebase/firestore"; 



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
  const [foundUser, setFoundUser] = useState(null);
  const {logout, isLog} = useLogout();
  const [open, setOpen] = useState(false);
  const [area_open, setAreaOpen] = useState(false);
  const {user, isLoading} = useAuth();
  const [area, setArea] = useState("");
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState([]);
  const [name, setNames] = useState([]);
  const [webDesignLevel, setWebDesignLevel] = useState([]);
  const [backLevel, setBackLevel] = useState([]);
  const [frontLevel, setFrontLevel] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("matricula");


  if(isLoading) return "Loading..."

  const navigateToProfile = () =>{ 
    
    navigate('/profile?matricula='+user?.matricula+'')

  }

  const navigateUserProfile = () =>{
    navigate('/profile?matricula='+foundUser?.matricula+'')
  }

  const navigateToFeed = () =>{
    navigate('/App?matricula='+user?.matricula+'')
  }


  const getUser = async (event, newValue) => {
    const data = newValue?.toLowerCase();
    const getFromFirebase = collection(db,"users");


    try {
    getDocs(getFromFirebase).then((querySnapshot) => {
      const optionsList = [];
      querySnapshot.forEach((doc) => {
        const option = doc.data()[searchCriteria]?.toLowerCase();

        if(option !== undefined){
        optionsList.push(option);
        console.log("lista" + optionsList)
        switch (searchCriteria){
        case 'matricula':
          setMatricula(optionsList);
          break;
        case 'name':
          setNames(optionsList);
          break;
        case 'webDesignLevel':
          setWebDesignLevel(optionsList);
          break;
        case 'backLevel':
          setBackLevel(optionsList);
          break;
        case 'frontLevel':
          setFrontLevel(optionsList);
          break;
        }
      }
        if (option === data ) {
          querySnapshot.forEach((doc) => {
            console.log(doc.data().searchCriteria )
            if (doc.data().searchCriteria?.toLowerCase() === data)
              setFoundUser(doc.data())
          })

          console.log(`Found ${searchCriteria}: ${doc.data()[searchCriteria]}`);
          console.log(doc.data())
          
        }
      })
    });
  } catch (error) {
    console.error('Error', error);
  }
  }


  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <IconButton
         onClick= { navigateToFeed}
         >
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } , color: "white" }}>
          {user?.matricula.toUpperCase()  }
        </Typography>
        </IconButton>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Autocomplete
          options={searchCriteria === 'matricula' ? matricula : searchCriteria === 'name' ? name : 
          searchCriteria === 'webDesignLevel' ? webDesignLevel :
          searchCriteria === 'frontLevel' ? frontLevel :
          searchCriteria === 'backLevel' ? backLevel : []
          }
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <div>
            <Select
             value={searchCriteria}
             onChange={(e) => setSearchCriteria(e.target.value)}
             displayEmpty
             input={<OutlinedInput label="Search Criteria" />}
             sx={{ marginLeft: 2 }}
          >
          <MenuItem value="matricula">Matricula</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="webDesignLevel">Web Design Skills</MenuItem>
          <MenuItem value="backLevel">Backend Skills</MenuItem>
          <MenuItem value="frontLevel">Frontend Skills</MenuItem>
          <MenuItem value="mobileLevel">Mobile Development Skills</MenuItem>
          </Select>
            <TextField
              {...params}
              id="search_field"
              placeholder={`Search by ${searchCriteria.charAt(0).toUpperCase() + searchCriteria.slice(1)}`}
              sx={{width: '500px'}}
            />
            </div>
          )}
          onInputChange={(event, newValue) => {
            setFoundUser(null);
            getUser(newValue);
          }}
          />

          {foundUser && (
      <section style={{ backgroundColor: '#eee'}}>
            <p>
              Found User:
              <button onClick={navigateUserProfile}>
              {foundUser.matricula} - {foundUser.name}
              </button>
            </p>
      </section>
    )}
        <div>
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
      {foundUser && (
        <section style={{backgroundColor: '#eee'}}>

        </section>
      )}
    </AppBar>
  );
};

export default Navbar;
