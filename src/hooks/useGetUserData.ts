import { useEffect, useState } from "react";
import { UserDeezer } from "../types/UserDeezer";
import { setUserDeezerData } from "../reducers/userDeezerReducer";
import { DEEZER_API_BASE } from "../env";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "@tanstack/react-query";
import { AccessToken } from '../types/Login';
import axios from "axios";

const fetchUserData = async (url: string) => (await axios(url)).data;

export const useGetUserData = (): [UserDeezer?] => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const userDeezerToken: AccessToken | undefined = useSelector((state: RootState) => state.userDeezer.token);
  
  const deezerAuthURL = new URL('/user/me', DEEZER_API_BASE);
  deezerAuthURL.searchParams.append("access_token", userDeezerToken?.accessToken ?? '');
  
  const { isPending, data } = useQuery({ 
    queryKey: ['deezer-user'], 
    queryFn: () => fetchUserData(deezerAuthURL.toString()),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isPending && data) {
      dispatch(setUserDeezerData(data));
      setUserData(data);
    }
  }, [isPending]);

  return [userData];
}