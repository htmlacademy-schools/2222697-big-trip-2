import FiltersView from './view/filters';
import { render } from './framework/render';
import Trip from './presenter/trip';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const pointModel = new PointsModel();
const tripPresenter = new Trip(tripContainer, pointModel);

const filters = generateFilter(pointModel.point);


render(new FiltersView(filters), filterContainer);

tripPresenter.init();