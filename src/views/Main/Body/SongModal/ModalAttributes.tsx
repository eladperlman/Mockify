import { Typography } from '@mui/material';

interface Props {
  title: string;
  content: string | number;
}

const ModalAttributes = ({ title, content }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <Typography variant="body1" component="p">
        {title}
      </Typography>
      <Typography sx={{ color: 'text.disabled' }} variant="body2" component="p">
        {content}
      </Typography>
    </div>
  );
};

export default ModalAttributes;
