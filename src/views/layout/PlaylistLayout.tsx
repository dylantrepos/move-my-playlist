import { useGetDeezerUserData } from '../../hooks/deezer/useGetDeezerUserData';
import '../styles/PlaylistLayout.scss';
import { PropsWithChildren } from 'react';

type Props = {
  title: string;
}

export default function PlaylistLayout({
  title,
  children
}: PropsWithChildren<Props>) {
  const [user] = useGetDeezerUserData(); 

  return user && (
  <div className='playlistLayout'>
    <h1 className='playlistLayout__title'>
      { title }
    </h1>
    { children }
  </div> 
  ) 
}
