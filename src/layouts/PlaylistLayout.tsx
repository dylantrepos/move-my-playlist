import { PropsWithChildren } from "react";
import { TitleItem } from "../components/TitleItem";
import { ListContainer } from "../components/ListContainer";
import './style/PlaylistLayout.scss';


type Props = {
  name: string;
  listClassNames?: string;
}

export const PlaylistLayout = ({
  name,
  listClassNames,
  children
}: PropsWithChildren<Props>) => {

  return (
    <div className="playlistsLayout__container">
      <TitleItem  classNames="playlistsLayout__title">Choose the playlist</TitleItem>
      <ListContainer 
        title={`${name}'s playlists`}
        subtitle={'Added recently'}
        classNames={`playlistsLayout__list ${listClassNames}`}
      >
        { children }
      </ListContainer>
    </div>
  )
}
