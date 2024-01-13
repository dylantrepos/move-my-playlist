import { PropsWithChildren } from "react";
import { TitleItem } from "../components/TitleItem";
import { ListContainer } from "../components/ListContainer";
import './style/PlaylistLayout.scss';

type Props = {
  title: string;
  listTitle: string;
  listSubtitle: string;
  listClassNames?: string;
}

export const PlaylistLayout = ({
  title,
  listTitle,
  listSubtitle,
  listClassNames,
  children
}: PropsWithChildren<Props>) => {
  return (
    <div className="playlistsItem__container">
      <TitleItem  classNames="playlistsItem__title">{title}</TitleItem>
      <ListContainer 
        title={listTitle}
        subtitle={listSubtitle}
        classNames={`playlistsItem__list ${listClassNames}`}
      >
        { children }
      </ListContainer>
    </div>
  )
}
