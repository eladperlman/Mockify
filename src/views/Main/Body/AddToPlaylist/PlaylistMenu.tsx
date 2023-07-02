import { Menu, MenuItem } from '@mui/material';

interface Props {
  playlists: string[];
  anchorEl: Element | null | undefined;
  open: boolean;
  handleSelect(name: string): void;
  handleClose(): void;
}

const PlaylistMenu = ({
  playlists,
  anchorEl,
  open,
  handleSelect,
  handleClose,
}: Props) => {
  return (
    <Menu
      sx={{ '& .MuiPaper-root': { width: 183, maxHeight: 300 } }}
      anchorEl={anchorEl}
      id="playlist-menu"
      open={open}
      onClose={handleClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {playlists.map((playlist) => (
        <MenuItem
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
          }}
          key={playlist}
          onClick={() => {
            handleSelect(playlist);
            handleClose();
          }}
        >
          {playlist}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default PlaylistMenu;
