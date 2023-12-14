import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import DeezerPopupRedirection from "../views/DeezerPopupRedirection";
import Home from "../views/Home";
import { loginLoader } from './loader';
import SpotifyPopupRedirection from "../views/SpotifyPopupRedirection";
import DeezerToSpotify from "../views/DeezerToSpotify";
import SpotifyToDeezer from "../views/SpotifyToDeezer";
import Landing from "../views/Landing";
import { Layout } from "../components/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
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
        loader: loginLoader,
      },
      {
        path: "deezer-to-spotify",
        element: <DeezerToSpotify />,
        loader: loginLoader,
      },
      {
        path: "spotify-to-deezer",
        element: <SpotifyToDeezer />,
        loader: loginLoader,
      },
    ]
  }
]);