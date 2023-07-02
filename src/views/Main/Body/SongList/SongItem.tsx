import { IconButton, ListItemText, TableCell, TableRow } from '@mui/material';
import { ISongItem } from '../../../../global/interfaces';
import { formatMS } from '../../../../utils/FormatTime';
import LikeIcon from '../../../../components/LikeIcon';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Icon from '../../../../components/Icon';
import SongMenu from '../AddToPlaylist/SongMenu';
import { useState } from 'react';

const SongItem = ({
  id,
  title,
  img,
  artist,
  length,
  album,
  liked,
  date,
  index,
  likeSongHandler,
  showModalHandler,
  setSnackBar,
  deleteSongHandler,
}: ISongItem) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const showMenu = !!anchorEl;

  const handleSongMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <TableRow
        hover
        role="button"
        tabIndex={-1}
        onDoubleClick={() => showModalHandler(id)}
      >
        <TableCell>{index}</TableCell>
        <TableCell
          sx={{
            display: 'flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <Icon style={{ marginRight: 10 }} img={img} title={title} />
          <ListItemText primary={title} secondary={artist}></ListItemText>
        </TableCell>
        <TableCell
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {album}{' '}
        </TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>
          <LikeIcon
            liked={liked}
            onClick={() => {
              likeSongHandler(id);
              setSnackBar(`Succesfully ${liked ? 'unliked' : 'liked'} a song!`);
            }}
          />
        </TableCell>
        <TableCell align="right">{formatMS(length)}</TableCell>
        <TableCell>
          <IconButton
            onClick={handleSongMenu}
            aria-label="more"
            id="long-button"
            aria-controls={showMenu ? 'playlist-menu' : undefined}
            aria-expanded={showMenu ? 'true' : undefined}
            aria-haspopup="true"
          >
            <MoreHorizIcon />
          </IconButton>
          <SongMenu
            anchorEl={anchorEl}
            open={showMenu}
            handleClose={() => setAnchorEl(null)}
            handleSelect={() => {
              setSnackBar('Succesfully remove song!');
              deleteSongHandler(id);
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default SongItem;
