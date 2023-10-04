import { createBrowserRouter } from "react-router-dom";
import Login from "../paginas/login";
import Signup from "paginas/signup";
import App from "../App";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/signup";

export const PROTECTED = "/protected"
export const FEED = "/protected/App";

export const router = createBrowserRouter([
    {path: ROOT, element: "Public Root" },
    {path: LOGIN, element: <Login />},
    {path: REGISTER, element: <Signup />},
    {path: PROTECTED, element: <App />, children: [{
        path: FEED,
        element: "App",
    },
  ],
}
])