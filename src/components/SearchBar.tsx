import { InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { playlistActions } from '../store';
import { useDispatch } from 'react-redux';
import { searchSongs } from '../global/constants';
import { useSearchTracksQuery } from '../store/api/apiSlice';

type Props = {
  placeholder?: string;
  children?: JSX.Element | JSX.Element[] | false;
};

const SearchBar = ({ placeholder, children }: Props) => {
  const [search, setSearch] = useState<string>('');
  const dispatch = useDispatch();
  const { data } = useSearchTracksQuery(search);

  return (
    <form
      className="flex justify-center min-w-[50%]"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          playlistActions.setSearchResults(
            data.map((track: any) => {
              return {
                title: track.name,
                length: track.duration_ms,
                img: track.album.images[2].url,
                artist: track.artists[0].name,
                id: track.id,
                album: track.album.name,
                bigImg: track.album.images[1].url,
              };
            })
          )
        );
        dispatch(playlistActions.setCurPlaylist(searchSongs));
      }}
    >
      <OutlinedInput
        value={search}
        sx={{
          borderRadius: 10,
          bgcolor: 'secondary.main',
          zIndex: 1,
          width: '100%',
        }}
        color="primary"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon color="inherit" />
          </InputAdornment>
        }
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
    {children}
    </form>
  );
};

export default SearchBar;
