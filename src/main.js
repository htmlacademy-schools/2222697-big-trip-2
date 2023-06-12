import { render } from './framework/render';
import TripPresenter from './presenter/trip';
import FiltersView from './view/filters';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';
import { getPoints, getOffersByType, getDestinations } from './mock/point.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);

const tripPresenter = new TripPresenter(siteMainElement.querySelector('.trip-events'), pointsModel);
tripPresenter.init();

const filters = generateFilter(pointsModel.points);

render(new FiltersView(filters), siteHeaderElement.querySelector('.trip-controls__filters'));