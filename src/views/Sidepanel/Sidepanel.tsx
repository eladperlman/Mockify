import { Box, Drawer, IconButton, List, Typography } from '@mui/material';
import { drawerWidth } from '../../global/constants';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PanelItem from './PanelItem';
import Paper from '../../components/Paper';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { playlistActions } from '../../store';
import { IPlaylist, IRootState } from '../../store/interfaces';
import AddPlaylistModal from './AddPlaylistModal';
import { useState } from 'react';
import { createPlaylist } from '../../store/helpers';

const Sidepanel = () => {
  const dispatch = useDispatch();

  const curPlaylist = useSelector(
    (state: IRootState) => state.playlist.curPlaylist
  );
  const liked: IPlaylist = useSelector(
    (state: IRootState) => state.playlist.liked
  );
  const playlists: IPlaylist[] = useSelector(
    (state: IRootState) => state.playlist.playlists
  );

  const selectPlaylistHandler = (name: string) => {
    dispatch(playlistActions.setCurPlaylist(name));
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onModalSave = (name: string) => {
    if (!createPlaylist(name)) {
      setError(true);
    } else {
      setShowModal(false);
      setError(false);
    }
  };

  const onModalClose = () => {
    setError(false);
    setShowModal(false);
  };

  return (
    <>
      <AddPlaylistModal
        onClose={onModalClose}
        error={error}
        open={showModal}
        handleSave={onModalSave}
      />
      <Drawer
        sx={{
          width: { drawerWidth },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            zIndex: 5,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Paper height="100%">
          <Typography
            color="text.disabled"
            m={1}
            variant="h6"
            component="h6"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ font: 'inherit' }}>
              <LibraryMusicIcon sx={{ mr: 1 }} />
              Your Library
            </Box>
            <IconButton
              onClick={() => setShowModal(true)}
              sx={{ p: '0.15rem', ml: 1 }}
            >
              <AddIcon />
            </IconButton>
          </Typography>
          <List sx={{ width: '100%' }}>
            <PanelItem
              selected={curPlaylist === liked.name}
              title={liked.name}
              onClick={selectPlaylistHandler}
            />
            {playlists.map((playlist, index) => (
              <PanelItem
                key={index}
                selected={curPlaylist === playlist.name}
                title={playlist.name}
                onClick={selectPlaylistHandler}
              />
            ))}
          </List>
        </Paper>
      </Drawer>
    </>
  );
};

export default Sidepanel;
