import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import DeezerPopupRedirection from "../views/DeezerPopupRedirection";
import Home from "../views/Home";
import { loginLoader } from './loader';
import SpotifyPopupRedirection from "../views/SpotifyPopupRedirection";
import SpotifyToDeezer from "../views/SpotifyToDeezer";
import Landing from "../views/Landing";
import { Layout } from "../components/Layout";
import TracksLayout from "../views/layout/TracksLayout";
import { DeezerPlaylistsItem } from "../components/deezer/DeezerPlaylistsItem";
import { DeezerPlaylistsTracksItem } from "../components/deezer/DeezerPlaylistsTracksItem";
import { Header } from "../components/Header";

export const router = createBrowserRouter([
  {
    element:  <>
        <Header />
        <Outlet />
    </>,
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
        element: <Outlet />,
        loader: loginLoader,
        children: [
          {
            path: "playlist",
            element: <DeezerPlaylistsItem />
          },
          {
            path: "tracks",
            element: <DeezerPlaylistsTracksItem />
          }
        ]
      },
      {
        path: "spotify-to-deezer",
        element: <SpotifyToDeezer />,
        loader: loginLoader,
      },
    ]
  }
]);