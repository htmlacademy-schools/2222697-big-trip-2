import FiltersView from './view/filters';
import { render, RenderPosition } from './render';
import Trip from './presenter/trip';
import PointsModel from './model/points-model.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});

const pointModel = new PointsModel();

render(new FiltersView(), filterContainer, RenderPosition.BEFOREEND);
tripPresenter.init(tripContainer, pointModel);
