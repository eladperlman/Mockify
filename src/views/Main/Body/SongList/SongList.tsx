import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '../../../../components/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { IPlaylist, IRootState } from '../../../../store/interfaces';
import { playlistActions } from '../../../../store';
import { useState } from 'react';
import SongItem from './SongItem';
import { ISongList, columns } from '../../../../global/interfaces';
import { likedSongs } from '../../../../global/constants';

const SongList = ({ showModalHandler, setSnackBar }: ISongList) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();

  const playlist: IPlaylist = useSelector(
    (state: IRootState) =>
      state.playlist.playlists.find(
        (playlist) => playlist.name === state.playlist.curPlaylist
      ) || state.playlist.liked
  );

  const likeSongHandler = (id: string) => {
    dispatch(playlistActions.likeSong({ id, playlist: playlist.name }));
  };

  const deleteSongHandler = (id: string) => {
    if (playlist.name === likedSongs) {
      likeSongHandler(id);
    } else {
      dispatch(
        playlistActions.removeSongFromPlaylist({ playlist: playlist.name, id })
      );
    }
  };

  const changePageHandler = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const changeRowsPerPageHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <Typography p={3} variant="h5" component="h5">
        {playlist.name}
      </Typography>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                >
                  {column.svg ? <column.svg /> : null}
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {playlist.songs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((song, index) => (
                <SongItem
                  setSnackBar={setSnackBar}
                  key={song.id}
                  {...song}
                  likeSongHandler={likeSongHandler}
                  deleteSongHandler={deleteSongHandler}
                  index={index + 1}
                  showModalHandler={showModalHandler}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={playlist.songs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={changePageHandler}
        onRowsPerPageChange={changeRowsPerPageHandler}
      />
    </Paper>
  );
};

export default SongList;
