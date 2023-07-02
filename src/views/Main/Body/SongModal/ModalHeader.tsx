import { Typography } from '@mui/material';
import Icon from '../../../../components/Icon';

interface Props {
  title: string;
  bigImg: string;
}

const ModalHeader = ({ title, bigImg }: Props) => {
  return (
    <div className=" flex flex-col">
      <Icon
        style={{
          marginTop: 20,
          marginBottom: 10,
          width: 150,
          height: 150,
          alignSelf: 'center',
        }}
        title={title}
        img={bigImg}
      />
      <Typography sx={{ alignSelf: 'center' }} variant="h4" component="h4">
        {title}
      </Typography>
    </div>
  );
};

export default ModalHeader;
