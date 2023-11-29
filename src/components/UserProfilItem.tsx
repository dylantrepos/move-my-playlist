import { useSelector } from "react-redux"
import { RootState } from '../store/store';

export default function UserProfilItem() {
  const userDeezerData = useSelector((state: RootState) => state.userDeezer.user);

  return (
    <>
      <div>userProfil</div>
      <p>Id: {userDeezerData?.id ?? 'error'}</p>
      <p>Name: {userDeezerData?.name ?? 'error'}</p>
    </>
  )
}
