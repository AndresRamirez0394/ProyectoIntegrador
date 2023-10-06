import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import {auth} from 'lib/firebase';
import App from '../App'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export function useAuth() {
    const [authUser, isLoading, error] = useAuthState(auth);

    return { user: authUser, isLoading: error};
}

export function useLogin(){
    const [isLoading, setLoading] = useState(false);

    async function login({email, password}){
        setLoading(true);

        try {
        await signInWithEmailAndPassword(auth, email, password)
        toast('You are now logged in', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            theme: "dark",
            pauseOnHover: true,
        });
        } catch (error) {
            return false;
        }

        setLoading(false)
        return true;
    }

    return {login, isLoading}
}

export function useRegister(){

    async function register({ firstName, lastName, email, password})
    return {register, isLoading};
}

export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const navigate = useNavigate();

    async function logout() {
        if(await signOut()) {
            toast('Succesfully logged out!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                theme: "dark",
                pauseOnHover: true,
            });
            navigate('/login');
        }
    }
    return {logout, isLoading}
}