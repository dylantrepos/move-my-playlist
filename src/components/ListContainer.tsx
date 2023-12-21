import { PropsWithChildren, useEffect, useState } from 'react';
import { Check } from '../assets/icons/Check.tsx';
import Chevron from '../assets/images/chevrons.png';
import './styles/ListContainer.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addAllTrack, setSelectedTracks } from '../reducers/deezerReducer';
import { RootState } from '../store/store';

type Props = {
  title: string;
  withSelectAll?: boolean;
}

export const ListContainer = ({
  title,
  withSelectAll,
  children
}: PropsWithChildren<Props>) => {

  return (
    <div className='listContainer'>
      <Header
        title={title}
        withSelectAll={withSelectAll}
      />
      <div className="listContainer__playlist-item-container">
        { children }
      </div>
    </div>
  )
}

const Header = ({
  title,
  withSelectAll,
}: PropsWithChildren<Props>) => {
  return (
    <div className="listContainer__header">
        <div className="listContainer__header-title">
          {title}
        </div>
        <img src={Chevron} />
        <p>Added recently</p>
        { withSelectAll && (
          <Toggle />
        )}
    </div>
  )
}


const Toggle = () => {
  const [checkAllTracks, setCheckAllTracks] = useState(false);
  const currTracksSelected = useSelector((state: RootState) => state.deezer.selectedTracks);
  const currPlaylistSelected = useSelector((state: RootState) => state.deezer.selectedPlaylist)

  const dispatch = useDispatch();

  const handleCheckAllTracks = () => {
    if (checkAllTracks) {
      dispatch(setSelectedTracks([]));
    } else {
      dispatch(addAllTrack());
    }
    setCheckAllTracks(!checkAllTracks);
  }

  useEffect(() => {
    if (currTracksSelected.length === currPlaylistSelected?.nb_tracks) setCheckAllTracks(true);
    else setCheckAllTracks(false);
    
    if (currTracksSelected.length === 0) setCheckAllTracks(false);
  }, [currTracksSelected])

  return (
    <button 
      className={`${checkAllTracks ? '-checked' :''}`}
      onClick={() => handleCheckAllTracks()}
    >
      {`${checkAllTracks ? 'Unselect' : 'Select'} all`}
      <Check classNames={`${checkAllTracks && '-checked'}`} /> 
    </button> 
  )
}
