import './styles/TrackItem.scss';
import { Check } from "../assets/icons/Check";

const Track = ({
  cover,
  trackTitle,
  albumTitle,
  artist,
}: TrackItemProps) => {
  return (
    <>
      <img 
        src={cover} 
        className="trackItem__image"
      />
      <p className="trackItem__title">
        {trackTitle}
      </p>
      <p className="trackItem__artist">
        {artist}
      </p>
      <p className="trackItem__album">
        {albumTitle} 
      </p>
    </>
  )
}

type TrackItemProps = {
  cover: string;
  trackTitle: string;
  albumTitle: string;
  artist: string;
}

export const TrackItem = ({
  cover,
  trackTitle,
  albumTitle,
  artist,
}: TrackItemProps) => {
  return (
    <div 
      className="trackItem"
    >
      <Track
        cover={cover}
        trackTitle={trackTitle}
        albumTitle={albumTitle}
        artist={artist}
      />
    </div>
  )
}

type TrackInputItemProps = TrackItemProps & {
  id: number | string;
  checked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TrackInputItem = ({
  id,
  cover,
  trackTitle,
  albumTitle,
  artist,
  checked,
  handleChange
}: TrackInputItemProps) => {
  return (
    <label 
      className="trackItem"
    >
      <input 
        type="checkbox" 
        value={id}
        onChange={handleChange}
      />
     <Track
        cover={cover}
        trackTitle={trackTitle}
        albumTitle={albumTitle}
        artist={artist}
      />
      <Check              
        classNames={`trackItem__check ${checked ? '-checked' : ''}`} 
      />
    </label>
  )
}

