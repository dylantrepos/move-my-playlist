import { AxiosError } from "axios"

type ErrorProps = {
  error: AxiosError;
  type: 'Deezer' | 'Spotify';
}

const style = {
  background: '#ffd1d1',
  width: 'fit-content',
  padding: '14px 30px',
  border: '1px solid #ffa9a9',
  borderRadius: '5px'
}

export const ErrorItem: React.FC<ErrorProps> = ({ type }) => {
  return (
    <div>
      <h5 style={ style }>Sorry, the { type } API has encounter a problem. Please, try again later...</h5>
    </div>
  )
}
