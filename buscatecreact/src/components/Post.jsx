import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Box,
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
import CommentIcon from '@mui/icons-material/Comment';
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "lib/firebase";
import { collection, orderBy, query } from "@firebase/firestore";
import { useAuth } from "hooks/auth";
import {formatDistanceToNow} from "date-fns";
import { useToggleLike, GetUser , DeletePost} from "hooks/posts";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useComments } from "hooks/comments";
import { useAddFriend } from "hooks/friends";
import { useUser } from "hooks/useUser";


export default function Post ({post}){
  const {txtValue} = post;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mat, setMat] = useState("");
  const {imgValue} = post;
  const {date} = post;
  const {id, likes, owner, matricula} = post;
  const {user, isLoading} = useAuth();
  const isFriend = user?.friends.includes(owner) ? true : false;
  const isLiked = likes.includes(user?.id) ? true : false;
  const {toggleLike, isLoading: likeLoading} = useToggleLike(id, isLiked, user?.id, );
  const {addFriends, isLoading: friendLoading} = useAddFriend(user?.id, isFriend, owner);
  const {deletePost, isLoading: deleteLoading} = DeletePost(id);
  const {comments , isLoading: commentsLoading } = useComments(id);
  const {user: getUser, isLoading: userLoading} = useUser(owner);


  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = () =>{ 
    console.log("matricula a buscar" +  matricula);
    navigate('/profile?matricula='+matricula+'')

  }

  const navigateToComments = () =>{ 
    console.log("id del post antes de entrar " +  id);
    navigate('/comments?post='+id+'')

  }


  const open = Boolean(anchorEl);
  const id_settings = open ? 'simple-popover' : undefined;

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
            

          <div>
            <IconButton aria-describedby={id_settings} variant="contained" onClick={handleClick}>
            <MoreVert />
      </IconButton>
      <Popover
        id={id_settings}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <p >
        <IconButton 
         onClick={addFriends}>
        <Typography sx={{ p: 2 }}>{isFriend? "Eliminar de Amigos":"Agregar a amigos"  }</Typography> 
        </IconButton>
        </p>
        <p>
        <IconButton
        onClick={(e) => navigateToProfile() }>
        <Typography  sx={{ p: 2 }}>Ver Perfil</Typography>
        </IconButton>
        </p>
      </Popover>
          </div>
        }
        title= {getUser?.name ?  getUser?.name :  matricula}
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
        <IconButton >
          <CommentIcon 
          onClick = {(e) => navigateToComments()}/>
          {comments?.length}
        </IconButton>
        
        {user?.matricula === matricula ?
        <IconButton
        onClick={deletePost}
        >
        <DeleteForeverIcon
        />
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
