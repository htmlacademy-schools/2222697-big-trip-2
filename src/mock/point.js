import { getRandomArrayElement, getRandomNumber } from '../utils';
import { createRandomDates } from './dates';
import { POINT_TYPES, DESCRIPTIONS, DESTINATIONS_NAMES, tripPrice, offerPrice, OFFER_TITLES } from './consts';

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
  id,
  title: getRandomArrayElement(OFFER_TITLES),
  price: getRandomNumber(offerPrice.MIN, offerPrice.MAX)
});

const createOfferByType = (id) => ({
  id,
  type: getRandomArrayElement(POINT_TYPES),
  offers: Array.from({ length: getRandomNumber(2,5) }, createOffer)
});

const createPoint = (id) => {
  const randomDates = createRandomDates();
  return {
    basePrice: getRandomNumber(tripPrice.MIN, tripPrice.MAX),
    dateFrom: randomDates.dateFrom,
    dateTo: randomDates.dateTo,
    destination: createDestination(),
    id,
    isFavorite: Boolean(getRandomNumber(0, 1)),
    offers: createOfferByType(),
    type: getRandomArrayElement(POINT_TYPES)
  };
};

export { createPoint };