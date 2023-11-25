import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfil from '../components/UserProfil/UserProfil';
import { RootState } from '../store/store';


export default function Home() {
  const userDeezerData = useSelector((state: RootState) => state.userDeezer);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('userDeezerData ! ', userDeezerData);
    if (Object.keys(userDeezerData).length === 0) navigate('/');
  }, [userDeezerData]);

  return (
    <>
      <div>Home</div>
      <Link to={'/'}>go back to connection</Link>
      <UserProfil />
    </>
  )
}
