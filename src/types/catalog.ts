export type Artist = {
  id: string;
  name: string;
};

export type Catalog = {
  id: string;
  name: string;
  preview_url: string;
  track_url: string;
  artists: Artist[];
  album_name: string;
  images: { url: string }[];
  album_type: string;
  album_group: string;
  release_date: string;
};

export type ArtistCatalog = {
  items: Catalog[];
};
