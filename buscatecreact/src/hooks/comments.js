import { uuidv4 } from "@firebase/util";
import {doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";

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

export function useAddComment({postID}){
    const [isLoading, setLoading] = useState(false);

    async function addComment(text){
        setLoading(true);
        const id = uuidv4();
        const date = Date.now();
        const docRef = doc(db, "comments", id);
        await setDoc(docRef, {text, id, postID, date})

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