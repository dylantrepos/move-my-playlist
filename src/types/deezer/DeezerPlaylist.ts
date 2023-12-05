export type DeezerPlaylists = {
  data: DeezerPlaylist[];
  total: number;
}

export type DeezerPlaylist = {
    id: number,
    title: string,
    duration: number,
    public: true,
    is_loved_track: false,
    collaborative: false,
    nb_tracks: number,
    fans: number,
    link: string,
    picture: string,
    picture_small: string,
    picture_medium: string,
    picture_big: string,
    picture_xl: string,
    checksum: string,
    tracklist: string,
    creation_date: string,
    md5_image: string,
    picture_type: string,
    time_add: number,
    time_mod: number,
    creator: {
      id: string,
      name: string,
      tracklist: string,
      type: string
    },
    type: string
}