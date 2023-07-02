import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import SearchIcon from '@mui/icons-material/Search';
import { ISidePanelItem } from '../../global/interfaces';
import { likedSongs, searchSongs } from '../../global/constants';

const PanelIcon = ({ title }: { title: string }) => {
  switch (title) {
    case likedSongs:
      return <FavoriteIcon />;
    case searchSongs:
      return <SearchIcon />;
    default:
      return <FeaturedPlayListIcon />;
  }
};

const PanelItem = (props: ISidePanelItem) => {
  const color = props.selected ? 'primary.main' : 'inherit';
  return (
    <ListItemButton
      onClick={() => props.onClick(props.title)}
      sx={{ color: color }}
    >
      <ListItemIcon sx={{ minWidth: 0, pr: 2, color: color }}>
        <PanelIcon title={props.title} />
      </ListItemIcon>
      <ListItemText
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        primary={props.title}
      />
    </ListItemButton>
  );
};

export default PanelItem;
