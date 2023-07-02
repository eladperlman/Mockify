import { Box, Button, Grid, IconButton } from '@mui/material';
import Modal from '../../../../components/Modal';
import Paper from '../../../../components/Paper';
import { ISongModal } from '../../../../global/interfaces';
import ModalHeader from './ModalHeader';
import ModalAttributes from './ModalAttributes';
import './SongModal.css';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useState } from 'react';
import PlaylistMenu from '../AddToPlaylist/PlaylistMenu';
import { formatMS } from '../../../../utils/FormatTime';

const SongModal = ({
  id,
  title,
  artist,
  length,
  bigImg,
  release_date,
  popularity,
  preview_url,
  album,
  playlists,
  track_number,
  hideModalHandler,
  handleAddToPlaylist,
  setSnackBar,
}: ISongModal) => {
  const attributes = [
    { title: 'Artist', content: artist },
    { title: 'Album', content: album },
    { title: 'Length', content: formatMS(length) },
    { title: 'Release date', content: release_date },
    { title: 'Popularity', content: popularity },
    { title: 'Track number', content: track_number },
  ];
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const showPlaylistMenu = !!anchorEl;

  const handlePlaylistMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePlaylistMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Modal onClose={hideModalHandler}>
      <Paper
        className="song-modal"
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Button
          disabled={playlists.length === 0}
          sx={{
            position: 'absolute',
            left: '5%',
            top: '7%',
          }}
          onClick={handlePlaylistMenu}
          aria-label="more"
          id="long-button"
          aria-controls={showPlaylistMenu ? 'playlist-menu' : undefined}
          aria-expanded={showPlaylistMenu ? 'true' : undefined}
          aria-haspopup="true"
          variant="outlined"
          startIcon={<PlaylistAddIcon />}
        >
          Add to playlist
        </Button>
        <PlaylistMenu
          playlists={playlists}
          anchorEl={anchorEl}
          open={showPlaylistMenu}
          handleClose={handlePlaylistMenuClose}
          handleSelect={(playlist: string) => {
            setSnackBar(`Added to playlist!`);
            handleAddToPlaylist(playlist, id);
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <ModalHeader title={title} bigImg={bigImg} />
          <div className="min-h-[35%] w-[100%]">
            <Grid container spacing={2}>
              {attributes.map((attribute) => {
                return (
                  <Grid key={attribute.title} item xs={6}>
                    <ModalAttributes {...attribute} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <audio className="mb-5 " src={preview_url} controls>
            No preview audio found
          </audio>
        </Box>
        <IconButton
          onClick={hideModalHandler}
          sx={{
            position: 'absolute',
            right: '5%',
            top: '7%',
            color: 'primary.main',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Paper>
    </Modal>
  );
};

export default SongModal;
