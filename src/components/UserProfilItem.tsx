import { useGetUserData } from "../hooks/useGetUserData";
import { UserDeezer } from "../types/UserDeezer";

type UserProfilProps = {
  user: UserDeezer
}  

export const UserProfilItem: React.FC<UserProfilProps> = () => {
  const [user] = useGetUserData();  

  return user ?
    <>
      <div>userProfil</div>
      <p>Id: {user?.id ?? 'error'}</p>
      <p>Name: {user?.name ?? 'error'}</p>
    </>
  : 'Loading user data ...'
}
