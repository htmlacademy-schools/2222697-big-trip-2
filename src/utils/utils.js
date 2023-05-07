import dayjs from 'dayjs';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isPointPast = (pointDate) => dayjs(pointDate.dateFrom).isBefore(dayjs());
const isPointFuture = (pointDate) => dayjs(pointDate.dateTo).isAfter(dayjs());

export { getRandomNumber, getRandomArrayElement, isPointFuture, isPointPast};

