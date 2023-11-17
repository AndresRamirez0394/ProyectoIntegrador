import React from 'react'
import { flexbox } from '@mui/system';
import { useUser } from 'hooks/useUser';
import AvatarLink from './Avatar';
import { formatDistanceToNow } from 'date-fns';
import userNameButton from './userNameButton';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAuth } from 'hooks/auth';
import { useDeleteComment } from 'hooks/comments';



export default function Comment({comment}) {
  const {text, uid, date, id} = comment;
  const {user, isLoading: userLoading} =  useUser(uid);
  const {user: authUser, isLoading: authLoading} = useAuth(); 
  const {deleteComment , isLoading: commentLoading} = useDeleteComment(id);


    if (userLoading) return "Loading...";
    return (
    <div >
      
              <div style = {{ class : "card mb-4"}}>
                <div class="card-body">
                  <userNameButton user= {user}/>
                    <p style = {{  class : "card-text" }} >
                        {text}
                    </p>
                  <div  style = {{  class : "d-flex", display : "flex", justifycontent: "space-between",    justifyItems: "space-between"}}>
                    <div style = {{  class : "d-flex", display: "flex",  flexFlow: "row" , justifyContent: "space-between", justifyItems: "space-between"}}>
                    <AvatarLink user={user} size="sm" />
                        <p style = {{  class: "small mb-0 ms-2" }} >
                            
                            {formatDistanceToNow(date)}ago    
                        </p>

                      <p style = {{  class: "small mb-0 ms-2"}} >
                      
                        {user?.matricula} </p>
                    </div>
                    {authUser?.id === uid  && !authLoading ?
                        <IconButton
                        onClick={deleteComment}
                        >
                        <DeleteForeverIcon
                        />
                    </IconButton> : <></>}
                  </div>
                </div>
              </div>
    </div>
      
  )
}
