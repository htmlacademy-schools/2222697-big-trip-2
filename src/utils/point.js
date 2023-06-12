import dayjs from 'dayjs';

const isPointPast = (pointDate) => dayjs(pointDate.dateFrom).isBefore(dayjs());
const isPointFuture = (pointDate) => dayjs(pointDate.dateFrom).isAfter(dayjs());
const getDateTime = (date) => dayjs(date).format('DD/MM/YY hh:mm');

export { isPointFuture, isPointPast, getDateTime };