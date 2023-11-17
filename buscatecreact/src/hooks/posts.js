import { uuidv4 } from "@firebase/util";
import {doc, setDoc, getDoc, updateDoc, collection, where, query} from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { set } from "date-fns";

export function useAddPost (){
    const [isLoading, setLoading] = useState(false);

    async function addPost (post){
        setLoading(true);
        const id = uuidv4();
        await setDoc(doc(db, "posts", id), {
            ...post,
            id,
            date: Date.now(),
            likes: [],
        
        }); 
        }
        return {addPost, isLoading};
}



export function useToggleLike(postId,isLiked, userId){
    const [isLoading, setLoading] = useState(false);

    async function toggleLike(){
        setLoading(true);
        const ref = doc(db, "Post", postId);
        await updateDoc(ref, { 
            likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
        });
        setLoading(false);
    }
    return {toggleLike, isLoading};
}

export async function GetUser(UserId){
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState("");

        setLoading(true);
        const ref = doc(db, "users", UserId);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            setUser(docSnap.data().matricula);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        setLoading(false);

    return {user, isLoading};
}

export function usePost(id){
    const q = doc(db, "Post", id);
    const [post, isLoading] = useDocumentData(q);
    return {post, isLoading}; 
}


export function DeletePost (id){
    const [isLoading, setLoading] = useState(false);
    const [deletePost, setDeletePost] = useState(false);

    return {deletePost, isLoading};
}