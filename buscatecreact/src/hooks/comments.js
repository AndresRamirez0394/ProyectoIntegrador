import { uuidv4 } from "@firebase/util";
import {doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import { arrayRemove, arrayUnion } from "firebase/firestore";

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