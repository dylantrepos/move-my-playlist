import { SpotifyLoginItem } from "../components/spotify/SpotifyLoginItem";
import { DeezerLoginItem } from "../components/deezer/DeezerLoginItem";

export default function Login() {

  return (
    <>
      <DeezerLoginItem />
      <SpotifyLoginItem />
    </>
  )
}
