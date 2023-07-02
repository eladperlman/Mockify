import { SxProps, Theme } from '@mui/material';
import MuiPaper from '@mui/material/Paper';
import { mergeSx } from 'merge-sx';

const Paper = (props: {
  children?: JSX.Element[] | JSX.Element;
  height?: number | string;
  sx?: SxProps<Theme>;
  className?: string;
}) => (
  <MuiPaper
    className={props.className}
    sx={mergeSx({ m: 1, height: props.height, borderRadius: 2 }, props.sx)}
  >
    {props.children}
  </MuiPaper>
);

export default Paper;
