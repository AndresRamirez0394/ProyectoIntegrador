import Post from "./Post";
import { useLocation } from "react-router-dom";
import { usePost } from "hooks/posts";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import { collection, query, orderBy, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Add from "./Add";
import { display } from "@mui/system";



export default function Comments(){
    const variable = useLocation();
    const [mode, setMode] = useState("light");
    const postId = variable.search.split('=')[1];
    const {post, isLoading} = usePost(postId);
    const darkTheme = createTheme({
        palette: {
          mode: mode,
        },
      });

    if(isLoading) return "Loading..."

    return (
        <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Stack display = "flex" direction = "row" align-items =  "flex-start">
          <Sidebar setMode={setMode} mode={mode}/>
          <Box  pt= "10" width="30%" >
            <Post post={post}/>
            <NewComment post = {post}/>
            <CommentList post = {post} />
            </Box>
          </Stack>
        </Box>
      </ThemeProvider>

        
    );
}


