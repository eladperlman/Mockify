import { Typography } from '@mui/material';
import Paper from '../../../../components/Paper';
import { ISongResultItem } from '../../../../global/interfaces';
import LikeIcon from '../../../../components/LikeIcon';
import Icon from '../../../../components/Icon';
import { useDispatch } from 'react-redux';
import { useGetTrackQuery } from '../../../../store/api/apiSlice';
import { playlistActions } from '../../../../store';

const SongResultItem = ({
  id,
  img,
  artist,
  liked,
  title,
  likeSongHandler,
  showModalHandler,
  setSnackBar,
}: ISongResultItem) => {
  const dispatch = useDispatch();
  const { data } = useGetTrackQuery(id);

  const fetchData = () => {
    dispatch(
      playlistActions.updateSongData({
        id,
        props: {
          popularity: data.popularity,
          preview_url: data.preview_url,
          release_date: data.album.release_date,
          track_number: data.track_number,
        },
      })
    );
  };

  return (
    <>
      <div className="relative">
        <div
          role="button"
          className="peer song-result-button relative w-[100%] transition-transform active:scale-95"
          onClick={() => {
            fetchData();
            showModalHandler(id);
          }}
        >
          <Paper
            sx={{
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <div className="ml-4">
              <Icon style={{ paddingTop: 10 }} img={img} title={title} />
              <Typography
                sx={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  my: 2,
                }}
                variant="h5"
                component="h5"
              >
                {title}
              </Typography>
              <Typography sx={{ pb: 2 }} variant="body1" component="p">
                {artist}
              </Typography>
            </div>
          </Paper>
        </div>
        <LikeIcon
          className="like-icon  peer-active:scale-90"
          sx={{ position: 'absolute', right: '5%', bottom: '3%' }}
          liked={liked}
          onClick={() => {
            fetchData();
            setSnackBar(`Succesfully ${liked ? 'unliked' : 'liked'} a song!`);
            likeSongHandler(id);
          }}
        />
      </div>
    </>
  );
};

export default SongResultItem;
