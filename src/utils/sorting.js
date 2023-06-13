import dayjs from 'dayjs';
import { SortType } from '../consts';

const sortPointsDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointsTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return timeA - timeB;
};

const sortPointsPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

const sorting = {
  [SortType.DAY]: (points) => points.sort(sortPointsDay),
  [SortType.PRICE]: (points) => points.sort(sortPointsPrice),
  [SortType.TIME]: (points) => points.sort(sortPointsTime),
};

export { sorting };
