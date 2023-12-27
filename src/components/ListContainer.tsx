import { PropsWithChildren, useEffect, useState } from 'react';
import { Check } from '../assets/icons/Check.tsx';
import Chevron from '../assets/images/chevrons.png';
import './styles/ListContainer.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllTrack } from '../reducers/deezerReducer';
import { RootState } from '../store/store';

type Props = {
  title: string;
  subtitle?: string;
  withSelectAll?: boolean;
  classNames?: string;
}

export const ListContainer = ({
  title,
  subtitle,
  withSelectAll,
  classNames,
  children
}: PropsWithChildren<Props>) => {

  return (
    <div className={`listContainer ${classNames}`}>
      <div className="listContainer__header">
        <div className="listContainer__header-title">
          {title}
        </div>
        { subtitle && (<>
          <img src={Chevron} />
          <p>{subtitle}</p> 
        </>)}
        { withSelectAll && <Toggle /> }
      </div>
      <div className="listContainer__playlist-item-container">
        { children }
      </div>
    </div>
  )
}

const Toggle = () => {
  const [checkAllTracks, setCheckAllTracks] = useState(false);
  const {selectedTracks, selectedPlaylist} = useSelector((state: RootState) => state.deezer);

  const dispatch = useDispatch();

  const handleCheckAllTracks = () => {
    dispatch(updateAllTrack(checkAllTracks ? 'uncheckAll' : 'checkAll'));
    setCheckAllTracks(!checkAllTracks);
  }

  useEffect(() => {
    if (selectedTracks.length === 0) setCheckAllTracks(false);
    else setCheckAllTracks(selectedTracks.length === selectedPlaylist?.nb_tracks);
  }, [selectedTracks, selectedPlaylist])

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
