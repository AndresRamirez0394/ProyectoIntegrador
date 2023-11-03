import { uuidv4 } from "@firebase/util";
import {doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { query, where, getDocs, collection } from "firebase/firestore";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

export async function GetUser(matricula){
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    setLoading(true);
    const q = query(collection(db, "users"), where("matricula", "==", matricula));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        
        setUser(doc.id);
    });
    console.log(user);
    setLoading(false);
    return {user, isLoading};

}