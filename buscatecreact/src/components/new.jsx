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
import React from 'react'


export default function New({news}) {
    const {title, img, description} = news;
    console.log(news.img);

  return (
    <ListItem alignItems="flex-start">
    <ListItemAvatar>
          <Avatar alt="Remy Sharp" src= {img} />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {description}
            </React.Fragment>
          }
        />
    <Divider variant="inset" component="li" />
    </ListItem>
  )
}
