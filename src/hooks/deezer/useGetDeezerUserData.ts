import { useEffect, useState } from "react";
import { DeezerUser } from "../../types/deezer/DeezerUser";
import { setDeezerUser } from "../../reducers/deezerReducer";
import { DEEZER_API_BASE } from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { DeezerAccessToken } from '../../types/deezer/DeezerLogin';
import axios from "axios";

const fetchUserData = async (url: string) => (await axios(url)).data;

export const useGetDeezerUserData = (): [DeezerUser?] => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const userDeezerToken: DeezerAccessToken | undefined = useSelector((state: RootState) => state.deezer.token);
  
  const deezerAuthURL = new URL('/user/me', DEEZER_API_BASE);
  deezerAuthURL.searchParams.append("access_token", userDeezerToken?.accessToken ?? '');
  
  const { isPending, data } = useQuery({ 
    queryKey: ['deezer-user'], 
    queryFn: () => fetchUserData(deezerAuthURL.toString()),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isPending && data) {
      dispatch(setDeezerUser(data));
      setUserData(data);
    }
  }, [isPending]);

  return [userData];
}