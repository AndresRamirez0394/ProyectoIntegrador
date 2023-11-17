import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import {auth, db} from 'lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {setDoc, doc, getDoc} from "firebase/firestore"
import IsmatriculaExists from 'utils/userExist';
import { async } from 'q';

export function useAuth() {
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const ref = doc(db, "users", authUser?.uid);
            const docSnap = await getDoc(ref);
            setUser(docSnap.data());
            setLoading(false);
        }

        if(!authLoading){
            if(authUser) fetchData();
            else setLoading(false)
            
        }
    }, [authLoading]);

    return { user, isLoading: error};
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
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function register({ matricula, email, password, name}) {
        setLoading(true);

        let emailcheck = email.split("@");
        if (emailcheck[1] !== "tec.mx"){
            toast('Es necesario un correo Tec', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                theme: "light",
                pauseOnHover: true,
            });
        }
        else{
            const matriculaExists = await IsmatriculaExists(matricula);
            
        if (matriculaExists){
            toast('Esta matricula ya esta registrada!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                theme: "light",
                pauseOnHover: true,
            });
            setLoading(false);
        } else {
            try{
                const res = await createUserWithEmailAndPassword(auth, email, password);

              await setDoc(doc(db, "users", res.user.uid), {
                id: res.user.uid,
                matricula: matricula.toLowerCase(),
                date: Date.now(),
                email: email,
                post: [],
                friends: [res.user.uid],
                fullname: name,
                address: "",
                mobile: "",
                career: "",
                skills: [],
                interests: [],
                instagram: "",
                facebook: "",
                twitter: "",
                linkedin: "",
                github: "",
                position: "",
                profile_pic: "",

              });
              toast('Bienvenido a buscaTEC, ahora puedes ingresar con tu cuenta!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                theme: "dark",
                pauseOnHover: true,
            });

            } catch(error){
                toast('Este usuario ya existe!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    theme: "dark",
                    pauseOnHover: true,
                });
            } finally {
                setLoading(false)
            }
        }}
    }
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