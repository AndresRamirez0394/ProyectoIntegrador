import { createBrowserRouter } from "react-router-dom";
import Login from "../paginas/login";
import Signup from "paginas/signup";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/signup";

export const FEED = "/protected/App";

export const router = createBrowserRouter([
    {path: ROOT, element: "Public Root" },
    {path: LOGIN, element: <Login />},
    {path: REGISTER, element: <Signup />},
])