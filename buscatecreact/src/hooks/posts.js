import { uuidv4 } from "@firebase/util";
import {doc, setDoc, getDoc} from "firebase/firestore";
import { db } from "lib/firebase";

import { useState } from "react";

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
