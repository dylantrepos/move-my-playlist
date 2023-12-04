import { useGetDeezerUserData } from "../../hooks/deezer/useGetDeezerUserData";
import { DeezerUser } from "../../types/deezer/DeezerUser";

type UserProfilProps = {
  user: DeezerUser
}  

export const DeezerUserItem: React.FC<UserProfilProps> = () => {
  const [user] = useGetDeezerUserData();  

  return user ?
    <>
      <div style={{
            display: 'flex', 
            alignItems: "center", 
            gap: '20px', 
            borderRadius: '10px', 
            background: '#a238ff', 
            width: '350px', 
            padding: '10px 20px',
            color: 'white',
            marginTop: '30px'
          }}>
          <img 
            src={user.picture}
            style={{margin: 0, width: '40px', height: '40px', borderRadius: '100px'}}
          />
        <div>
          <p style={{margin: 0}}>{user?.name ?? 'error'}</p>
          <p style={{margin: 0, fontSize: '10px', fontWeight: '300'}}>Id: {user?.id ?? 'error'}</p>
        </div>
      </div>
    </>
  : 'Loading user data ...'
}
