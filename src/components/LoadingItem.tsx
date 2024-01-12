import { TitleItem } from './TitleItem';
import './styles/LoadingItem.scss';

type Props = {
  title: string;
  message?: string;
}

export const LoadingItem = ({
  title,
  message = 'please wait...'
}: Props) => {
  return (
    <div className="loadingItem">
      <TitleItem>{title}</TitleItem>
      <p>{message}</p>
    </div> 
  )
}
