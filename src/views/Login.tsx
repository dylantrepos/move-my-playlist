import { DEEZER_AUTH, DEEZER_AUTH_BASE } from "../env";

const DEEZER_USER_AUTH_PARAMS: Record<string, string | null> = {
  "app_id": import.meta.env?.VITE_DEEZER_APP_ID ?? null,
  "redirect_uri": import.meta.env?.VITE_DEEZER_REDIRECT_URL ?? null,
  "perms": "basic_access,email",
}

export default function Login() {

  const deezerUserURL = new URL(DEEZER_AUTH, DEEZER_AUTH_BASE);

  for (const [key, value] of Object.entries(DEEZER_USER_AUTH_PARAMS)) {
    if (value) deezerUserURL.searchParams.append(key, value);
  }

  const connectToDeezerAPI = async () => {
    window.open(deezerUserURL, "_self");
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
