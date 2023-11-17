import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";
import { useAuth } from "hooks/auth";
import { GetUserPost } from "hooks/posts";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "lib/firebase";
import { collection, orderBy, query } from "@firebase/firestore";
import { set } from "date-fns";
import { getDocs } from "firebase/firestore";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";




export default function FeedFriends  (){
    const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(true);
  const {user, isLoading} = useAuth(); 
    const [posts, setPosts] = useState([]);
    const friends = user?.friends;
    const darkTheme = createTheme({
        palette: {
          mode: mode,
        },
      });

    const GetPosts = () => {
        const getFromFirebase = collection(db,"Post");
        
    
        getDocs(getFromFirebase).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            friends.forEach((friend) => {
              if(doc.data().owner === friend){
                setPosts((posts) => [...posts, doc.data()]);
              }
            });
          });
        });
        console.log("datos");
    
      }


    useEffect(() => {
        GetPosts();
    }, [friends]);


  setTimeout(() => {
    setLoading(false);
  }, [2000]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
                <Box flex={4} p={{ xs: 0, md: 2 }}>
            { posts?.length === 0 
            ? <text>NO POST YET</text> 
            : (posts?.map((post) => <Post key={post.id} post={post} />)) 

            }
            </Box>
        </Stack>
      </Box>
    </ThemeProvider>

  );
};

