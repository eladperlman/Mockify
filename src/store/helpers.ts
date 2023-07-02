import store, { playlistActions } from '.';
import { likedSongs, searchSongs } from '../global/constants';

export const createPlaylist = (name: string) => {
  name = name && name[0].toUpperCase() + name.slice(1).toLowerCase();
  const playlistState = store.getState().playlist;

  if (
    playlistState.playlists.find((playlist) => playlist.name === name) ||
    name === likedSongs ||
    name === searchSongs ||
    name === ''
  ) {
    return false;
  }

  store.dispatch(playlistActions.createPlaylist(name));
  return true;
};
