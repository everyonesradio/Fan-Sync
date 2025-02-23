export type Artist = {
  id: string;
  name: string;
};

export type Image = {
  url: string;
  height: number;
  width: number;
};

export type Catalog = {
  id: string;
  name: string;
  preview_url: string | null;
  track_url: string;
  artists: Artist[];
  images: Image[];
  album_name: string;
  album_type: string;
  album_group: string;
  release_date: string;
};

export type ArtistCatalog = {
  items: Catalog[];
};
