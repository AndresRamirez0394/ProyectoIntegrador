import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "lib/firebase";
import { collection, orderBy, query } from "@firebase/firestore";
import { useAuth } from "hooks/auth";
import {formatDistanceToNow} from "date-fns";
import { useToggleLike, GetUser } from "hooks/posts";

export default function Post ({post}){
  const {txtValue} = post;
  const {imgValue} = post;
  const {date} = post;
  const {id, likes, owner, matricula} = post;
  const {user, isLoading} = useAuth();
  const isLiked = likes.includes(user?.id) ? true : false;
  const {toggleLike, isLoading: likeLoading} = useToggleLike(id, isLiked, user?.id, );
 
  

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title= {matricula}
        subheader = {formatDistanceToNow(date)}
      />

      {{imgValue} != `""` ? <CardMedia
        component="img"
        height="20%"
        image={imgValue}
      />: <>{console.log("sin Imagen")}</>} 
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {txtValue}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            onClick={toggleLike}
            icon={isLiked?<Favorite sx={{ color: "red" }} /> : <FavoriteBorder /> } 
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            
          />
        {likes.length}
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        {user?.matricula === matricula ?
        <IconButton aria-label="share">
        <DeleteForeverIcon />
      </IconButton> : <></>}
      </CardActions>
    </Card>
  );
};

export function usePost(){
  const q = query(collection(db, "Post"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  
  if (error) throw error;
  return {posts, isLoading};
  
}
