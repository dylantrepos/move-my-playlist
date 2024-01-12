import { Title } from './Title';
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
      <Title>{title}</Title>
      <p>{message}</p>
    </div> 
  )
}
