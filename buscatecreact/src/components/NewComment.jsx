import React from 'react'
import { useAuth } from 'hooks/auth';
import AvatarLink from './Avatar';
import { useForm } from 'react-hook-form';
import { useAddComment } from 'hooks/comments';
import {  Box, Input, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function NewComment({post}) {
  const {id: postID} = post;
  const {user, isLoading} = useAuth();
  const {register, handleSubmit, reset} = useForm();
  const {addComment, isLoading: commentLoading} = useAddComment ({postID})
  const navigate = useNavigate();

  function handleAddComment(data) {
    console.log(data);
    addComment(data.text)
    reset();
  }

  const navigateToFeed = () =>{
    navigate('/App?matricula='+user?.matricula+'')
  }

  return (
      <Box width="100%" maxWidth="600px">
        <AvatarLink user={user} size="md" />
        <form onSubmit={handleSubmit(handleAddComment)}>
          <Box>
            <Input
              size="sm"
              variant="flushed"
              placeholder="Write a comment..."
              autoComplete="off"
              {...register("text", { required: true })}
            />
          </Box>
          <div pt="2">
            <Button
              isLoading={isLoading}
              type="submit"
              colorScheme="teal"
              size="xs"
              ml="auto"
            >
              Agregar Comentario
            </Button>
          </div>
        </form>
      </Box>
  );
}
