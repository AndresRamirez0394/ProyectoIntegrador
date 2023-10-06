import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";

function Feed  ({posts}){
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [2000]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      { posts?.length === 0 
      ? <text>NO POST YET</text> 
      : (posts?.map((post) => <Post key={post.id} post={post} />)) 

      }
    </Box>
  );
};

export default Feed;
