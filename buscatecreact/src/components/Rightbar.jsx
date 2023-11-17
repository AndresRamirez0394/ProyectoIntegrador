import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNews } from "hooks/news";
import New from "./new";
import { useAuth } from "hooks/auth";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LatestPhotos from "./LatestPhotos";


const Rightbar = () => {
  const { news, isLoading } = useNews();
  const {user, isLoading: authLoading} = useAuth(); 
    const [images, setImages] = useState([]);

  
  const GetPosts = () => {
    const getFromFirebase = query(collection(db,"Post"), orderBy("date", "desc"));
    setImages([]);
    getDocs(getFromFirebase).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().owner === user?.id)
          setImages((images) => [...images, doc.data().imgValue]);
      });
    });

  }


useEffect(() => {
    GetPosts();
    console.log ("TODAS LAS IMAGENES" + images[0]);
}, []);

  if (isLoading) return "Loading...";
  console.log(news); 

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={300}>
        <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
          Latest Photos
        </Typography>
        <ImageList cols={3} rowHeight={100} gap={5}>
          {images.map((item) => (
            <LatestPhotos img={item} />
          ))}
        </ImageList>
        <Typography variant="h6" fontWeight={100} mt={2}>
          Ultimas Noticias
        </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {news.map((n) => (
          <New news={n}/>
        ))}

    </List>
      </Box>
    </Box>
  );
};

export default Rightbar;
