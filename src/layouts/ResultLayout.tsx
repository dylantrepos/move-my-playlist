import { PropsWithChildren } from "react";
import { TitleItem } from "../components/TitleItem";
import { ListContainer } from "../components/ListContainer";
import './style/ResultLayout.scss';
import { SpotifyTrack } from "../types/spotify/SpotifyTrack";
import { Link } from "react-router-dom";
import { LoadingItem } from "../components/LoadingItem";
import { DeezerTrack } from "../types/deezer/DeezerPlaylistTracks";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


type Props = {
  hasBeenAdded: boolean;
  tracksNotFound: DeezerTrack[] | SpotifyTrack[];
  playlistTitle: string;
}

export const ResultLayout = ({
  hasBeenAdded,
  tracksNotFound,
  playlistTitle,
  children
}: PropsWithChildren<Props>) => {
  const { from, to } = useSelector((state: RootState) => state.general);

  return (
    hasBeenAdded ? (
      <>
        <div className={`tracksResultLayout__container ${tracksNotFound.length === 0 ? '-not-found' : ''}`}>
          <div className="tracksResultLayout__header">
            <TitleItem classNames="tracksResultLayout__header-title">
              Your playlist has been added !
            </TitleItem>
            <p className="tracksResultLayout__header-description">Your playlist <span className="tracksResultLayout__playlist-title">{ playlistTitle }</span> has been successfully added to your {to} playlists. {tracksNotFound.length > 0 &&`Unfortunately, some tracks couldn't be found on ${to}, but you can check and add them manually if you'd like.`}</p>
            <Link to={`/${from}-to-${to}/playlist`} className="button-primary tracksResultLayout__header-button">
              Transfert another playlist
            </Link>
          </div>
        { tracksNotFound.length > 0 && 
            <ListContainer
              title="Tracks not found"
              classNames="tracksResultLayout__list"
            > 
             { children }
          </ListContainer>
        }
        </div>
      </>)
      : <LoadingItem title="Importing your new playlist" />
  )
}
