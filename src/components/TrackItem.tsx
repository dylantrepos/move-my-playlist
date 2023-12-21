import './styles/TrackItem.scss';
import { Check } from "../assets/icons/check";

type Props = {
  id: number;
  cover: string;
  trackTitle: string;
  albumTitle: string;
  artist: string;
  checked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TrackItem = ({
  id,
  cover,
  trackTitle,
  albumTitle,
  artist,
  checked,
  handleChange
}: Props) => {
  return (
    <label 
      className="trackItem"
    >
      <input 
        type="checkbox" 
        value={id}
        onChange={handleChange}
      />
      <img 
        src={cover} 
        className="trackItem__image"
      />
      <p className="trackItem__title">
        {trackTitle}
      </p>
      <p className="trackItem__info">
        {artist}
      </p>
      <p className="trackItem__author">
        {albumTitle} 
      </p>
      <Check            
        classNames={`trackItem__check ${checked ? '-checked' : ''}`} 
      />
    </label>
  )
}
