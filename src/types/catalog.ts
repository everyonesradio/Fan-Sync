export type Album = {
  id: string;
  name: string;
  images: { url: string }[];
  album_type: string;
  release_date: string;
};

export type ArtistCatalog = {
  items: Album[];
};