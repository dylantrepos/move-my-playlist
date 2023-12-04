import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import DeezerPopupRedirection from "../views/DeezerPopupRedirection";
import Home from "../views/Home";
import { homeLoader } from './loader';
import SpotifyPopupRedirection from "../views/SpotifyPopupRedirection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "deezer-redirection",
    element: <DeezerPopupRedirection />,
  },
  {
    path: "spotify-redirection",
    element: <SpotifyPopupRedirection />,
  },
  {
    path: "home",
    element: <Home />,
    loader: homeLoader,
  },
]);