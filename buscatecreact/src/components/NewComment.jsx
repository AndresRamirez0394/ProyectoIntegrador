import React from 'react'
import { Box, Stack , Input , Button} from "@mui/material";
import { useAuth } from 'hooks/auth';
import AvatarLink from './Avatar';
import { useForm } from 'react-hook-form';
import { useAddComment } from 'hooks/comments';


export default function NewComment({post}) {
  const {id: postID} = post;
  const {user, isLoading} = useAuth();
  const {register, handleSubmit, reset} = useForm();
  const {addComment, isLoading: commentLoading} = useAddComment ({postID})

  function handleAddComment(data) {
    console.log(data);
    addComment(data.text)
    reset();
  }

  return (
    <Box maxWidth= "600px" mx= "auto" py = "6">
      <div padding = "4">
        <AvatarLink user = {user} size = "md"/>
        <Box flex= "1" ml = "4">
          <form onSubmit={handleSubmit(handleAddComment)}>
            <Box>
              <Input 
              size ="sm"
              variant = "flushed"
              placeholder = "Write a comment..."
              autoComplete='off'
              {...register("text", {required : true})}
              /> 
            </Box>
            <div pt = "2">
              <Button
                isLoading = {isLoading}
                type = "submit"
                colorScheme = "teal"
                size = "xs"
                ml = "auto"
              >
                Agregar Comentario
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </Box>
  )
}
