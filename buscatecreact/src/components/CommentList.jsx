import React from 'react'
import { useComments } from 'hooks/comments'
import Comment from './Comment';
import { Box } from '@mui/material';

export default function CommentList({post}) {
    const{id} = post;
    const {comments, isLoading} = useComments(id);
    if (isLoading) return "Loading...";

    return (
        <Box>
        {comments?.map((comment) => <Comment key= {comment.id} comment={comment}/>)}
        </Box>
    );
}
