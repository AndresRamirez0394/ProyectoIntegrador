import Post from "./Post";
import { useLocation } from "react-router-dom";
import { usePost } from "hooks/posts";
import { Box, Stack, Flex } from "@mui/material";
import NewComment from "./NewComment";


export default function Comments(){
    const variable = useLocation();
    const postId = variable.search.split('=')[1];
    console.log("id del post luego de entrar " + postId);
    const {post, isLoading} = usePost(postId);
    console.log("post luego de entrar " + post);

    if(isLoading) return "Loading..."

    return (
        <Box align="center" pt= "10" width="40%" >
            <Post post={post}/>
            <NewComment/>
        </Box>
    );
}