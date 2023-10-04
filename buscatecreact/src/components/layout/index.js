import Login from "../../paginas/login";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {useAuth} from "hooks/auth";

export default function Layout() {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {user, isLoading} = useAuth();


    useEffect(() => {
        if (!user){
            navigate(Login);
        }
    }, [pathname, user]);

    if (isLoading) return "Loading page...";

    return (
        <>
            This is the child: <Outlet />
        </>
    );
}