import { useState } from "react";
import { db } from "lib/firebase";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

export function useAddFriend(myuid,isfrined, userId){
    const [isLoading, setLoading] = useState(false);

    async function addFriends(){
        setLoading(true);
        const ref = doc(db, "users", myuid);
        await updateDoc(ref, { 
            friends: isfrined ? arrayRemove(userId) : arrayUnion(userId),
        });
        setLoading(false);
    }
    return {addFriends, isLoading};
}