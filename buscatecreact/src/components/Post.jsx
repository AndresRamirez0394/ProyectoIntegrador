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
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "lib/firebase";
import { collection, orderBy, query } from "@firebase/firestore";
import { useAuth } from "hooks/auth";
import formateDistanceToNow from "date-fns/formatDistanceToNow";

export default function Post ({post}){
  const {txtValue} = post;
  const {imgValue} = post;
  const {date} = post;
  const {user, isLoading} = useAuth();

  console.log(post);
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
        title={user?.matricula}
        subheader = {formateDistanceToNow(date)}
      />

      {{imgValue} != `""` ? <CardMedia
        component="img"
        height="20%"
        image={imgValue}
        alt="Paella dish"
      />: 1} 
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {txtValue}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
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
