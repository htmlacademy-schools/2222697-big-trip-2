import FiltersView from './view/filters';
import { render, RenderPosition } from './render';
import Trip from './presenter/trip';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});

render(new FiltersView(), filterContainer, RenderPosition.BEFOREEND);
tripPresenter.init();