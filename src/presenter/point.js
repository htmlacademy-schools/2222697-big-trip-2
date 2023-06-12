import { render, RenderPosition } from '../framework/render';
import SortView from '../view/sort';
import TripList from '../view/trip-list';
import NoPointView from '../view/no-point';
import PointPresenter from './point';
import { updateItem } from '../utils/utils';
import {SortType} from '../consts';
import {sortByDay, sortByPrice, sortByTime} from '../utils/point';


export default class Trip {
  #container = null;
  #pointsModel = null;
  #tripPoints = []

  #sourcedBoardPoints = [];
  #currentSortType = [];

  #pointsList = new TripList();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  #pointPresenter = new Map();

  constructor(container, pointsModel) {
    this.#pointsModel = pointsModel;
    this.#container = container;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.point];
    this.#sourcedBoardPoints = [...this.#pointsModel.point];

    if (this.#tripPoints.length === 0) {
      return this.#renderNoPoints();
    }

    this.#renderSort();
    this.#renderPointsList();
  }

  #renderSort = () => {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoints = (from, to) => {
    this.#tripPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  }

  #renderPointsList = () => {
    render(this.#pointsList, this.#container);
    this.#renderPoints(0, this.#tripPoints.length);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsList.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearEventsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#tripPoints.sort(sortByDay);
        break;
      case SortType.TIME:
        this.#tripPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortByPrice);
        break;
      default:
        this.#tripPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearEventsList();
    this.#renderPointsList();
  };

}