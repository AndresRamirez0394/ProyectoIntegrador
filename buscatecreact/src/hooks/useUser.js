import {doc, query} from "firebase/firestore";
import { db } from "lib/firebase";
import { useDocumentData} from "react-firebase-hooks/firestore";

export function useUser(id){
    const q = query(doc(db, "users", id));
    const [user, loading, error] = useDocumentData(q);

    if(error) throw error;
    return {user, loading};
}