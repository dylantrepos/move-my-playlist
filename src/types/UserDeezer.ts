export type UserDeezer = {
  id: number,
  name:string,
  lastname:string,
  firstname:string,
  email:string,
  status: number,
  birthday:string,
  inscription_date:string,
  gender:string,
  link:string,
  picture:string,
  picture_small:string,
  picture_medium:string,
  picture_big:string,
  picture_xl:string,
  country:string,
  lang:string,
  is_kid: boolean,
  explicit_content_level:string,
  explicit_content_levels_available: [
      "explicit_display",
      "explicit_no_recommendation",
      "explicit_hide"
  ],
  tracklist: string,
  type: string
}

export type PlaylistDeezer = {
    id: string,
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