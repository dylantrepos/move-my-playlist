export default function Login() {

  const connectToDeezerAPI = async () => {
    window.open(import.meta.env.VITE_DEEZER_URL, "_self");
  }

  return (
    <>
      <div>
        <p>
          Logged into Deezer to start.
        </p>
        <button onClick={connectToDeezerAPI}>Connect to Deezer</button>
      </div>
    </>
  )
}
