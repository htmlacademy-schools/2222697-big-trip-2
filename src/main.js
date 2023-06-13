import {render} from './framework/render';
import TripPresenter from './presenter/trip';
import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model';
import FilterPresenter from './presenter/filter';
import NewPointButtonView from './view/new-point-button';
import PointsApi from './points-api';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import {AUTHORIZATION, END_POINT} from './consts';

const mainElement = document.querySelector('.page-main');
const headerElement = document.querySelector('.trip-main');

const newPointButtonComponent = new NewPointButtonView();

const pointsModel = new PointsModel(new PointsApi(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new PointsApi(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new PointsApi(END_POINT, AUTHORIZATION));

const filterModel = new FiltersModel();

const filterPresenter = new FilterPresenter(headerElement.querySelector('.trip-controls__filters'), filterModel, pointsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(headerElement.querySelector('.trip-main__trip-info'), mainElement.querySelector('.trip-events'), pointsModel, filterModel, destinationsModel, offersModel);

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      render(newPointButtonComponent, headerElement);
      newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
    });
  });
});
