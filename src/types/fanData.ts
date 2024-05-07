export interface FanData {
  uuid: string;
  profile_picture: string;
  dob: string;
  location: string;
  username: string;
  anthem: {
    id: string;
    name: string;
    preview_url: string;
    track_url: string;
    artists: Array<{ id: string; name: string }>;
    images: Array<{
      height: { $numberInt: string };
      url: string;
      width: { $numberInt: string };
    }>;
    album_type: string;
    album_group: string;
    release_date: string;
  };
  signature: string;
}
