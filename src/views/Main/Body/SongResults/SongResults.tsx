import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store/interfaces';
import { ISongData, ISongResults } from '../../../../global/interfaces';
import SongResultItem from './SongResultItem';
import { playlistActions } from '../../../../store';
import { Filters } from '../../../../global/constants';

const SongResults = ({ showModalHandler, setSnackBar }: ISongResults) => {
  const dispatch = useDispatch();
  const results = useSelector(
    (state: IRootState) => state.playlist.searchResults
  );
  const filter = useSelector((state: IRootState) => state.search.filter);

  const likeSongHandler = (id: string) => {
    dispatch(playlistActions.likeSong({ id, playlist: results.name }));
  };

  const compare = (a: ISongData, b: ISongData) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    }
    return 0;
  };

  const filterResults = () => {
    const copy = [...results.songs];
    switch (filter) {
      case Filters.ASCENDING:
        return copy.sort(compare);
      case Filters.DESCENDING:
        return copy.sort(compare).reverse();
      default:
        return results.songs;
    }
  };

  return (
    <>
      {results.songs.length !== 0 ? (
        <Grid container spacing={2}>
          {filterResults().map((result: ISongData, index: number) => (
            <Grid key={index} item xs={4}>
              <SongResultItem
                setSnackBar={setSnackBar}
                showModalHandler={showModalHandler}
                likeSongHandler={likeSongHandler}
                {...result}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="flex justify-center items-center h-[20rem]">
          <Typography variant="h6" component="h6" color="text.disabled">
            Search for a song to see results!
          </Typography>
        </div>
      )}
    </>
  );
};

export default SongResults;
