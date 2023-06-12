import { getRandomArrayElement, getRandomNumber } from '../utils/common.js';
import { createRandomDates } from './dates';
import { POINT_TYPES, DESCRIPTIONS, DESTINATIONS_NAMES, tripPrice, offerPrice, OFFER_TITLES, picturesCount, POINTS_COUNT } from './consts';
import { nanoid } from 'nanoid';

const createPicture = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomNumber(0, 10)}`,
  description: getRandomArrayElement(DESCRIPTIONS),
});

const createDestination = (id) => ({
  id,
  description: getRandomArrayElement(DESCRIPTIONS),
  name: DESTINATIONS_NAMES[id],
  pictures: Array.from({ length: getRandomNumber(picturesCount.MIN, picturesCount.MAX) }, createPicture)
});

const getDestinations = () => Array.from({ length: DESTINATIONS_NAMES.length }).map((value, index) => createDestination(index));

const createOffer = (id) => ({
  id,
  title: getRandomArrayElement(OFFER_TITLES),
  price: getRandomNumber(offerPrice.MIN, offerPrice.MAX)
});

const generateOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({ length: getRandomNumber(picturesCount.MIN, picturesCount.MAX) }).map((value, index) => createOffer(index + 1, pointType)),
});

const getOffersByType = () => Array.from({ length: POINT_TYPES.length }).map((value, index) => generateOffersByType(POINT_TYPES[index]));

const createPoint = () => {
  const offerIds = getRandomArrayElement(getOffersByType()).offers.map((offer) => offer.id);
  const randomDates = createRandomDates();
  return {
    basePrice: getRandomNumber(tripPrice.MIN, tripPrice.MAX),
    dateFrom: randomDates.dateFrom,
    dateTo: randomDates.dateTo,
    destinationId: getRandomArrayElement(getDestinations()).id,
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    offerIds: Array.from({ length: getRandomNumber(0, offerIds.length) }).map(() => offerIds[getRandomNumber(0, offerIds.length - 1)]),
    type: getRandomArrayElement(getOffersByType()).type
  };
};

const getPoints = () => Array.from({ length: POINTS_COUNT }).map(() => createPoint()).sort();

export { getPoints, getDestinations, getOffersByType };