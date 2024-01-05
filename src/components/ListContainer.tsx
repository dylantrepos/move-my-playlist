import { PropsWithChildren } from 'react';
import Chevron from '../assets/images/chevrons.png';
import './styles/ListContainer.scss';

type Props = {
  title: string;
  select?: React.ReactNode;
  subtitle?: string;
  classNames?: string;
  toggleItem?: React.ReactNode;
}

export const ListContainer = ({
  title,
  select,
  subtitle,
  classNames = '',
  toggleItem,
  children
}: PropsWithChildren<Props>) => {

  return (
    <div className={`listContainer ${classNames}`}>
      <div className={`listContainer__header`}>
        { select 
          ? select 
          : <div className="listContainer__header-title">
            {title}
          </div>
        }
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
