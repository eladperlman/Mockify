import { Filters } from '../global/constants';
import { ISongData } from '../global/interfaces';

export interface IPlaylist {
  name: string;
  songs: ISongData[];
}

export interface IPlaylistState {
  liked: IPlaylist;
  playlists: IPlaylist[];
  curPlaylist: string;
  searchResults: IPlaylist;
}

export interface ISearchResult {
  title: string;
  length: number;
  img: string;
  artist: string;
  id: string;
  album: string;
}

export interface ISearchState {
  filter: Filters;
}

export interface IRootState {
  playlist: IPlaylistState;
  search: ISearchState;
}
