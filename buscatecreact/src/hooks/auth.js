import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from 'lib/firebase';
import App from '../App'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useState} from "react";

export function useAuth() {
    const [authUser, isLoading, error] = useAuthState(auth);

    return { user: authUser, isLoading: error};
}

export function useLogin(){
    const [isLoading, setLoading] = useState(false);

    async function login({email, password, redirectTo=App}){
        setLoading(true);

        try {
        await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            return false;
        }

        setLoading(false)
        return true;
    }

    return {login, isLoading}
}