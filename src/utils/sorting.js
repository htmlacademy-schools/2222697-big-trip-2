import dayjs from 'dayjs';
import { SortType } from '../mock/consts';

const sortPointsDayUp = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsTimeUp = (pointA, pointB) => {
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return timeA - timeB;
};

const sortPointsPriceUp = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

const sorting = {
  [SortType.DAY]: (points) => points.sort(sortPointsDayUp),
  [SortType.PRICE]: (points) => points.sort(sortPointsPriceUp),
  [SortType.TIME]: (points) => points.sort(sortPointsTimeUp),
};

export { sorting };