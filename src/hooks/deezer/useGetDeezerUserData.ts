import { useEffect, useState } from "react";
import { DeezerUser } from "../../types/deezer/DeezerUser";
import { setDeezerUser } from "../../reducers/deezerReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { DeezerAccessToken } from '../../types/deezer/DeezerLogin';
import axios from "axios";

const fetchUserData = async (token: string) => {
  const params: Record<string, string | null> = {
    "access_token": token,
  }

  const data = await axios.get('/deezer-api/user/me', { params })
  
  return data.data
}

export const useGetDeezerUserData = (): [DeezerUser?] => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const userDeezerToken: DeezerAccessToken | undefined = useSelector((state: RootState) => state.deezer.token);

  const { isPending, data } = useQuery({ 
    queryKey: ['deezer-user'], 
    queryFn: () => fetchUserData(userDeezerToken?.accessToken ?? ''),
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