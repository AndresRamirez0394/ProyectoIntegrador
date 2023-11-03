import { createBrowserRouter } from "react-router-dom";
import Login from "../paginas/login";
import Signup from "paginas/signup";
import App from "../App";
import UserProfile from "paginas/profile";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/signup";

export const PROTECTED = "/protected"
export const FEED = "/protected/App";

export const router = createBrowserRouter([
    {path: ROOT, element: "Public Root" },
    {path: LOGIN, element: <Login />},
    {path: REGISTER, element: <Signup />},
    {path: FEED, element: <App /> },
    {path: PROFILE, element: <UserProfile />},
])