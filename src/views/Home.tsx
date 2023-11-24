import { useLocation } from 'react-router';

export default function Home() {
  const {state} = useLocation()

  console.log('nav : ', state.key);
  return (<>
      <div>Home</div>
      <h1>Key : {state.key}</h1>
    </>
  )
}
