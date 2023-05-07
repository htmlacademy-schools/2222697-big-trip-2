import FiltersView from './view/filters';
import { render } from './render';
import Trip from './presenter/trip';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});

const pointModel = new PointsModel();

const filters = generateFilter(pointModel.point);


render(new FiltersView(filters), filterContainer);

tripPresenter.init(tripContainer, pointModel);