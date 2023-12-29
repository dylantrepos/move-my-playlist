import { PropsWithChildren } from 'react';
import Chevron from '../assets/images/chevrons.png';
import './styles/ListContainer.scss';

type Props = {
  title: string;
  subtitle?: string;
  classNames?: string;
  toggleItem?: React.ReactNode;
}

export const ListContainer = ({
  title,
  subtitle,
  classNames,
  toggleItem,
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
        { toggleItem }
      </div>
      <div className="listContainer__playlist-item-container">
        { children }
      </div>
    </div>
  )
}
