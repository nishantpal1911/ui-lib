import { addSeconds, formatDate } from 'date-fns';

export const formatSeconds = (seconds: number) => {
  const date = addSeconds(new Date('0'), seconds);

  return formatDate(date, 'mm:ss');
};
