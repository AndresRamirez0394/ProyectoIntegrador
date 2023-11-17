import { ImageListItem } from '@mui/material'
import React from 'react'


export default function LatestPhotos({img}) {
  return (
    <ImageListItem>
            <img
              src={img}
              alt=""
            />
</ImageListItem>
  )
}
