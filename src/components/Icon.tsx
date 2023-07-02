import { IIcon } from '../global/interfaces';

const Icon = ({ img, title, style }: IIcon) => {
  return (
    <img style={style} className="rounded-md shadow-lg" src={img} alt={title} />
  );
};

export default Icon;
