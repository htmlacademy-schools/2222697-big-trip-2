import { getRandomArrayElement, getRandomNumber } from '../utils/utils';
import { createRandomDates } from './dates';
import { POINT_TYPES, DESCRIPTIONS, DESTINATIONS_NAMES, tripPrice, offerPrice, OFFER_TITLES } from '../consts';
import {nanoid} from 'nanoid';

const createPicture = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomNumber(0, 10)}`,
  description: getRandomArrayElement(DESCRIPTIONS),
});

const createDestination = (id) => ({
  id,
  description: getRandomArrayElement(DESCRIPTIONS),
  name: getRandomArrayElement(DESTINATIONS_NAMES),
  pictures: Array.from({ length: getRandomNumber(2,5) }, createPicture)
});

const createOffer = (id) => ({
  id: id,
  title: getRandomArrayElement(OFFER_TITLES),
  price: getRandomNumber(offerPrice.MIN, offerPrice.MAX)
});

const createPoint = () => {
  const randomDates = createRandomDates();
  return {
    basePrice: getRandomNumber(tripPrice.MIN, tripPrice.MAX),
    dateFrom: randomDates.dateFrom,
    dateTo: randomDates.dateTo,
    destination: createDestination(),
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    offers: Array.from({ length: getRandomNumber(2,5) }, createOffer),
    type: getRandomArrayElement(POINT_TYPES)
  };
};

export { createPoint };