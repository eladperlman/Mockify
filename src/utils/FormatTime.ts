import dayjs from 'dayjs';

const formatSecs = (sec: number) => {
  return sec < 10 ? `0${sec}` : sec;
};

export const formatMS = (time: number) => {
  const date = new Date(time);
  const sec = formatSecs(date.getSeconds());
  return date.getMinutes() + ':' + sec;
};

export const curDate = () => dayjs().format('MMM, D YYYY');
