import React from 'react'
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Feed = () => {

    return (
        <Card >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Comprato foto de viaje"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          //poner 20% en height
          image=" "
          alt="Foto/ comentario"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Aqui podemos agregar un parrafo para compartir lo que pensamos con nuestro amigos y seguidores.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
         
        </CardActions>
        
      </Card>
    );
  }

export default Feed