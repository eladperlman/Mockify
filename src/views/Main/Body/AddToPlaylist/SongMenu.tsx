import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface Props {
  anchorEl: Element | null | undefined;
  open: boolean;
  handleSelect(action: string): void;
  handleClose(): void;
}

const SongMenu = ({ anchorEl, open, handleSelect, handleClose }: Props) => {
  const handleOption = (action: string) => {
    handleSelect(action);
    handleClose();
  };

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
      <MenuItem onClick={() => handleOption('delete')}>
        <ListItemIcon sx={{ mr: 1, minWidth: 0 }}>
          <RemoveCircleOutlineIcon fontSize="small" />
        </ListItemIcon>
        Remove song
      </MenuItem>
    </Menu>
  );
};

export default SongMenu;
