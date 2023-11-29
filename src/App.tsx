import { BrowserRouter, Routes, Route, Outlet, useNavigate, RouterProvider } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import DeezerRedirection from "./views/DeezerRedirection";
import { RootState } from "./store/store";
import { AccessTokenResponse } from "./types/Login";
import { useDispatch, useSelector } from "react-redux";
import { getCookieDeezerToken } from "./utils/utils";
import { setUserDeezerData, setUserTokenDeezerData } from "./reducers/userDeezerReducer";
import axios from "axios";
import { router } from "./router/router";

function DeezerAuthMiddleware({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const userDeezerToken: AccessTokenResponse | undefined = useSelector((state: RootState) => state.userDeezer.token);
  const tokenDeezerCookie = getCookieDeezerToken();

  // if (!userDeezerToken?.access_token && !tokenDeezerCookie) {
  //   navigate('/');
  //   return null;
  // }

  // const checkToken = async () => {
  //   if (!userDeezerToken?.access_token) {
  //     const tokenDeezerCookie = getCookieDeezerToken();
  
  //     if (tokenDeezerCookie) {
  //       dispatch(setUserTokenDeezerData(tokenDeezerCookie));
  //       const checkUserDataRequest = await axios.get(`https://api.deezer.com/user/me?access_token=${tokenDeezerCookie.access_token}`);
  //       const checkUserDataResponse = await checkUserDataRequest.data;
  //       dispatch(setUserDeezerData(checkUserDataResponse));
  //     } 
  //     console.log('tokenDeezerCookie : ', tokenDeezerCookie);
  //   } 
  // }

  // checkToken();

  return <>{children}</>;
}



function App() {
  return <RouterProvider router={router} />
}

export default App
