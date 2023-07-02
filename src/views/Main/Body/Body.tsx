import { Alert, Container, Snackbar } from '@mui/material';
import SongList from './SongList/SongList';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store/interfaces';
import SongResults from './SongResults/SongResults';
import {
  ModalAction,
  likedSongs,
  searchSongs,
} from '../../../global/constants';
import {
  IModalAction,
  IModalState,
  ISongData,
} from '../../../global/interfaces';
import { useReducer, useState } from 'react';
import SongModal from './SongModal/SongModal';
import { playlistActions } from '../../../store';

const initialModalState: IModalState = {
  songData: undefined,
};

const Body = () => {
  const dispatch = useDispatch();

  const [snackBar, setSnackBar] = useState<string>('');

  const handleSnackClose = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar('');
  };

  const curPlaylistName = useSelector(
    (state: IRootState) => state.playlist.curPlaylist
  );

  const playlistNames = useSelector(
    (state: IRootState) => state.playlist.playlists
  )
    .filter((playlist) => playlist.name !== curPlaylistName)
    .map((playlist) => playlist.name);

  const curPlaylist = useSelector((state: IRootState) => {
    switch (curPlaylistName) {
      case likedSongs:
        return state.playlist.liked;
      case searchSongs:
        return state.playlist.searchResults;
      default:
        return state.playlist.playlists.find(
          (playlist) => playlist.name === curPlaylistName
        );
    }
  });

  const modalReducer = (_state: IModalState, action: IModalAction) => {
    switch (action.type) {
      case ModalAction.SHOW:
        const newSong = curPlaylist?.songs.find(
          (song) => song.id === action.id
        );
        return { songData: newSong };
      case ModalAction.HIDE:
        return { songData: undefined };
    }
  };

  const [modal, dispatchModal] = useReducer(modalReducer, initialModalState);

  const showModalHandler = (id: string) => {
    dispatchModal({ type: ModalAction.SHOW, id });
  };

  const hideModalHandler = () => {
    dispatchModal({ type: ModalAction.HIDE });
  };

  const handleAddToPlaylist = (playlist: string, songID: string) => {
    const song = curPlaylist?.songs.find(
      (song: ISongData) => song.id === songID
    );
    if (song) {
      dispatch(playlistActions.addSongToPlaylist({ playlist, song }));
    }
  };

  return (
    <>
      {modal.songData && (
        <SongModal
          playlists={playlistNames}
          handleAddToPlaylist={handleAddToPlaylist}
          hideModalHandler={hideModalHandler}
          setSnackBar={setSnackBar}
          {...modal.songData}
        />
      )}
      <Container maxWidth="lg">
        {curPlaylistName === searchSongs ? (
          <SongResults
            setSnackBar={setSnackBar}
            showModalHandler={showModalHandler}
          />
        ) : (
          <SongList
            setSnackBar={setSnackBar}
            showModalHandler={showModalHandler}
          />
        )}
      </Container>
      <Snackbar
        open={!!snackBar}
        autoHideDuration={2000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity="success">
          {snackBar}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Body;
