import SearchBar from '../../../components/SearchBar';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { Filters, searchSongs, title } from '../../../global/constants';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store/interfaces';
import { searchActions } from '../../../store';

const Header = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: IRootState) => state.search.filter);
  const curPlaylist = useSelector(
    (state: IRootState) => state.playlist.curPlaylist
  );

  const handleChangeFilter = (e: any) => {
    dispatch(searchActions.changeFilter(e.target.value as Filters));
  };

  return (
    <Box m={5} display="flex" alignItems="center" flexDirection="column">
      <Typography
        textTransform="uppercase"
        color="primary.main"
        sx={{ textShadow: '0px 0px 5px', textDecoration: 'bold' }}
        variant="h2"
        component="h2"
        gutterBottom
      >
        {title}
      </Typography>
      <SearchBar placeholder="Choose your songs!">
      {curPlaylist === searchSongs && (
        <Select
          value={filter.toString()}
          onChange={handleChangeFilter}
          sx={{ minWidth: 132, position:'absolute', right: 60 }}
        > 
          <MenuItem value={Filters.NONE.toString()}>None</MenuItem>
          <MenuItem value={Filters.ASCENDING.toString()}>Ascending</MenuItem>
          <MenuItem value={Filters.DESCENDING.toString()}>Descending</MenuItem>
        </Select>
      )}
      </SearchBar>
      
    </Box>
  );
};

export default Header;
