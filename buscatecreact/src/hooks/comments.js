import { uuidv4 } from "@firebase/util";
import {doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import { arrayRemove, arrayUnion, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, query, orderBy, where } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();


export async function GetComments(postId){
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    console.log("Probadndo")
        setLoading(true);
        const ref = doc(db, "comments", postId);
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

export function useAddComment({postID, uid}){
    const [isLoading, setLoading] = useState(false);

    async function addComment(text){
        setLoading(true);
        const id = uuidv4();
        const date = Date.now();
        const docRef = doc(db, "comments", id);
        await setDoc(docRef, {text, id, postID, date, uid})

        logEvent(analytics, 'notification_received');

        toast('Comentario Agregado', {
            position: "top-center",
            autoClose: 100,
            hideProgressBar: false,
            theme: "dark",
        });
        setLoading(false);
    }
    return {addComment, isLoading};
}

export function useComments(postID){
    const q = query(collection(db, "comments"), where("postID", "==", postID), orderBy("date", "desc"));
    const [comments, loading, error] = useCollectionData(q);
    console.log("Comentarios", comments)

    if(error) throw error;

    return {comments, loading};
}



export function useDeleteComment(id){
    const [isLoading, setLoading] = useState(false);
    console.log("ID", id)
    async function deleteComment(){
        setLoading(true);
        console.log("ID", id)
        const ref = doc(db, "comments", id);
        await deleteDoc(ref);
        setLoading(false);
        toast('Comentario Eliminado', {
            position: "top-center",
            autoClose: 100,
            hideProgressBar: false,
            theme: "dark",
        });
        setLoading(false);
    }
    
    return {deleteComment, isLoading};
}
