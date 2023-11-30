import { UserDeezer } from "../types/UserDeezer";

type UserProfilProps = {
  user: UserDeezer
}  

export const UserProfilItem: React.FC<UserProfilProps> = ({ user }) => {
  return (
    <>
      <div>userProfil</div>
      <p>Id: {user?.id ?? 'error'}</p>
      <p>Name: {user?.name ?? 'error'}</p>
    </>
  )
}
