import {render} from './framework/render';
import TripPresenter from './presenter/trip';
import PointsModel from './model/points-model.js';
import { getPoints, getOffersByType, getDestinations } from './mock/point.js';
import FiltersModel from './model/filters-model';
import FilterPresenter from './presenter/filter';
import NewPointButtonView from './view/new-point-button';

const mainElement = document.querySelector('.page-main');
const headerElement = document.querySelector('.trip-main');

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const newPointButtonComponent = new NewPointButtonView();

const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();

pointsModel.init(points, destinations, offersByType);

const filterPresenter = new FilterPresenter(headerElement.querySelector('.trip-controls__filters'), filtersModel, pointsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(mainElement.querySelector('.trip-events'), pointsModel, filtersModel);
tripPresenter.init();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, headerElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);