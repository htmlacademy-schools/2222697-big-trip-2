import dayjs from 'dayjs';
import { getRandomNumber } from '../utils/utils';
import {MAX_DAYS_GAP} from '../consts';

const getRandomDate = () => dayjs()
  .add(getRandomNumber(-MAX_DAYS_GAP, MAX_DAYS_GAP), 'day')
  .add(getRandomNumber(1, 23), 'hour')
  .add(getRandomNumber(1, 59), 'minute');

const createRandomDates = () => {
  const date1 = getRandomDate();
  const date2 = getRandomDate();

  if (date1.isBefore(date2)) {
    return {
      dateFrom: date1.toISOString(),
      dateTo: date2.toISOString()
    };
  }
  return {
    dateFrom: date2.toISOString(),
    dateTo: date1.toISOString()
  };
};

export { createRandomDates };