import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import DeezerRedirection from "../views/DeezerRedirection";
import Home from "../views/Home";
import { homeLoader } from './loader';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    // loader: rootLoader,
  },
  {
    path: "deezer-redirection",
    element: <DeezerRedirection />,
    // loader: teamLoader,
  },
  {
    path: "home",
    element: <Home />,
    loader: homeLoader,
    // loader: teamLoader,
  },
]);