import { useGetSpotifyUserData } from "../../hooks/spotify/useGetSpotifyUserData";

export const SpotifyUserItem = () => {
  const [user] = useGetSpotifyUserData();  

  return user ?
    <>
      <h4>Spotify</h4>
      <div style={{
            display: 'flex', 
            alignItems: "center", 
            gap: '20px', 
            borderRadius: '10px', 
            background: '#49d761', 
            width: '350px', 
            padding: '10px 20px',
            color: 'black',
            marginTop: '30px'
          }}>
            
          <img 
            src={user?.images[0]?.url}
            style={{margin: 0, width: '40px', height: '40px', borderRadius: '100px', background: user?.images[0]?.url ? 'none' : 'white'}}
          />
        <div>
          <p style={{margin: 0}}>{user?.display_name ?? 'error'}</p>
          <p style={{margin: 0, fontSize: '10px', fontWeight: '300'}}>Id: {user?.id ?? 'error'}</p>
        </div>
      </div>
    </>
  : 'Loading user data ...'
}
