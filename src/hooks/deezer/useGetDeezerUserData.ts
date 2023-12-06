import { useEffect, useState } from "react";
import { DeezerUser } from "../../types/deezer/DeezerUser";
import { setDeezerUser } from "../../reducers/deezerReducer";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchDeezerUserProfil } from "../../services/deezerApi";

export const useGetDeezerUserData = (): [DeezerUser?] => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

  const { isPending, data } = useQuery({ 
    queryKey: ['deezer-user'], 
    queryFn: () => fetchDeezerUserProfil(),
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