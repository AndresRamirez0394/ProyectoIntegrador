import { collection, query, orderBy } from "firebase/firestore";
import { db } from "lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";


export function useNews(){
    const q = query(collection(db, "news"));
    const [news, isLoading, error] = useCollectionData(q);
    
    if (error) throw error;
    return {news, isLoading};
    
  }
  