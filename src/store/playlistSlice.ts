import { createSlice } from '@reduxjs/toolkit';
import { likedSongs, searchSongs } from '../global/constants';
import { IPlaylist, IPlaylistState } from './interfaces';
import { ISongData } from '../global/interfaces';
import { curDate } from '../utils/FormatTime';

const initialState: IPlaylistState = {
  searchResults: {
    name: searchSongs,
    songs: [],
  },
  liked: {
    name: likedSongs,
    songs: [],
  },
  playlists: [],
  curPlaylist: searchSongs,
};

type SearchResultsType = {
  type: string;
  payload: ISongData[];
};

type AddSongToPlaylistType = {
  type: string;
  payload: { playlist: string; song: ISongData };
};

type RemoveSongFromPlaylistType = {
  type: string;
  payload: { playlist: string; id: string };
};

const isSongInPlaylist = (playlist: IPlaylist, id: string) => {
  return !!playlist.songs.find((song) => song.id === id);
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    likeSong(state: IPlaylistState, action) {
      let song = state.searchResults.songs.find(
        (song) => song.id === action.payload.id
      );
      if (song) {
        song.liked = !song.liked;
      }

      state.playlists.forEach((playlist) => {
        song = playlist.songs.find((song) => song.id === action.payload.id);
        if (song) {
          song.liked = !song.liked;
        }
      });

      if (!isSongInPlaylist(state.liked, action.payload.id)) {
        song =
          state.playlists
            .find((playlist) => playlist.name === action.payload.playlist)
            ?.songs.find((song) => song.id === action.payload.id) ||
          state.searchResults.songs.find(
            (song) => song.id === action.payload.id
          );
        if (song) {
          state.liked.songs.push({
            ...song,
            liked: true,
            date: curDate(),
          });
        }
      } else {
        const index = state.liked.songs.findIndex(
          (song) => song.id === action.payload.id
        );
        state.liked.songs.splice(index, 1);
      }
    },
    addSongToPlaylist(state: IPlaylistState, action: AddSongToPlaylistType) {
      const song = action.payload.song;
      const playlist =
        state.playlists.find(
          (playlist) => playlist.name === action.payload.playlist
        ) || state.liked;
      if (!isSongInPlaylist(playlist, song.id)) {
        playlist.songs.push({
          ...song,
          date: curDate(),
        });
      }
    },
    removeSongFromPlaylist(
      state: IPlaylistState,
      action: RemoveSongFromPlaylistType
    ) {
      const songID = action.payload.id;
      const playlist =
        state.playlists.find(
          (playlist) => playlist.name === action.payload.playlist
        ) || state.liked;
      playlist.songs = playlist.songs.filter((song) => song.id !== songID);
    },
    createPlaylist(state: IPlaylistState, action) {
      state.playlists.unshift({ name: action.payload, songs: [] });
    },
    deletePlaylist(state: IPlaylistState, action) {
      state.playlists = state.playlists.filter(
        (playlist) => playlist.name !== action.payload
      );
    },
    setCurPlaylist(state, action) {
      state.curPlaylist = action.payload;
    },
    setSearchResults(state, action: SearchResultsType) {
      const adjustedResults: ISongData[] = action.payload.map((result) => {
        return {
          ...result,
          liked: !!state.liked.songs.find((song) => song.id === result.id),
        };
      });
      state.searchResults.songs = adjustedResults;
    },
    updateSongData(state, action) {
      const songs = state.searchResults.songs;
      state.searchResults.songs = songs.map((song) => {
        if (song.id === action.payload.id) {
          return { ...song, ...action.payload.props };
        }
        return song;
      });
    },
  },
});
