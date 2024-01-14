import { PropsWithChildren } from "react";
import { TitleItem } from "../components/TitleItem";
import { ListContainer } from "../components/ListContainer";
import './style/PlaylistTracksLayout.scss';
import { SpotifyPlaylist } from "../types/spotify/SpotifyPlaylist";
import { DeezerPlaylist } from "../types/deezer/DeezerPlaylist";
import { DeezerTrack } from "../types/deezer/DeezerPlaylistTracks";
import { SpotifyTrack } from "../types/spotify/SpotifyTrack";
import { PlaylistSelectItem } from "../components/PlaylistSelectItem";
import { ToggleItem } from "../components/ToggleItem";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

type Props = {
  title: string;
  listTitle: string;
  listSubtitle: string;
  listClassNames?: string;
  playlists: SpotifyPlaylist[] | DeezerPlaylist[];
  hasLoaded: boolean;
  selectedTracks: string[] | number[];
  selectedPlaylist: SpotifyPlaylist | DeezerPlaylist;
  trackListData: SpotifyTrack[] | DeezerTrack[];
  handleSubmitPlaylist: (e: React.FormEvent) => void;
  handleChangePlaylist: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updateAllTracks: (checkAllTracks: 'checkAll' | 'uncheckAll') => AnyAction;
}

export const PlaylistTracksLayout = ({
  title,
  listTitle, 
  listSubtitle,
  listClassNames,
  playlists,
  hasLoaded,
  selectedTracks,
  selectedPlaylist,
  trackListData,
  handleChangePlaylist,
  handleSubmitPlaylist,
  updateAllTracks,
  children
}: PropsWithChildren<Props>) => {

  const dispatch = useDispatch();

  return (<>
    <div className="playlistTracksLayout__container">
      <div className="playlistTracksLayout__header">
        <TitleItem classNames="playlistTracksLayout__header-title">{title}</TitleItem>
        <div className='playlistTracksLayout__header-select'>
            <button 
              className='button-primary'  
              disabled={selectedTracks.length === 0}
              onClick={handleSubmitPlaylist}
            >
              Confirm
            </button>
            
        </div> 
      </div>
      <ListContainer 
        title={listTitle}
        subtitle={listSubtitle}
        select={<PlaylistSelectItem 
          playlists={playlists}
          playlistId={selectedPlaylist.id}
          handleChangePlaylist={handleChangePlaylist}
        />}
        classNames={`playlistTracksLayout__list ${listClassNames ?? ''}`}
        toggleItem={
          <ToggleItem 
            selectedTracks={selectedTracks}
            selectedPlaylist={selectedPlaylist}
            updateAllTrack={(checkAllTracks: 'checkAll' | 'uncheckAll') => dispatch(updateAllTracks(checkAllTracks))}
          />
        }
      >
        { !hasLoaded || !trackListData
          ? <p>Loading tracks ...</p>
          : trackListData?.length === 0 
            ? <p>No tracks in this playlist.</p> 
            :
          <form
            className="playlistTracksLayout__playlist-form"
            onSubmit={() => handleSubmitPlaylist}
          >
            { children }
          </form> }
      </ListContainer>
    </div>
  </>
  )
}
