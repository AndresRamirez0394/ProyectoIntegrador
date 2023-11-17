import React from 'react'
import { useComments } from 'hooks/comments'


export default function CommentList({post}) {
    const{id} = post;
    const {comments, isLoading} = useComments(id);
    if (isLoading) return "Loading..."
  return comments?.map((comment) => <>{comment.text}<br/></>)
}
