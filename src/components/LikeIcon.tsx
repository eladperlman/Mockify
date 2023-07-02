import { IconButton, SxProps, Theme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { mergeSx } from 'merge-sx';

type Props = {
  liked: boolean;
  onClick: any;
  sx?: SxProps<Theme>;
  className?: string;
};

const LikeIcon = ({ liked, onClick, sx, className }: Props) => {
  return (
    <IconButton
      className={className}
      onClick={onClick}
      sx={mergeSx(
        {
          justifyContent: 'center',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.15)',
          },
        },
        sx
      )}
    >
      {liked ? (
        <FavoriteIcon sx={{ color: 'primary.main' }} />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  );
};

export default LikeIcon;
