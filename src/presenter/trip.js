import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort';
import TripList from '../view/trip-list';
import NoPointView from '../view/no-point';
import PointPresenter from './point';
import { updateItem } from '../utils/common.js';
import {SortType} from '../mock/consts';
import {sorting} from '../utils/sorting';


export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #tripPoints = [];

  #sourcedBoardPoints = [];
  #currentSortType = SortType.DAY;

  #pointsListComponent = new TripList();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  #pointPresenter = new Map();

  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    if (this.#tripPoints.length === 0) {
      this.#renderNoPoints();
    }
    else {
      this.#renderSort();
      this.#renderPointList();
    }
  }

  #renderSort = () => {
    sorting[SortType.DAY](this.#tripPoints);
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = (from, to) => {
    this.#tripPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  };

  #renderPointList = () => {
    render(this.#pointsListComponent, this.#tripContainer);
    this.#renderPoints(0, this.#tripPoints.length);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#pointsModel, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearEventsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortPoints = (sortType) => {
    sorting[sortType](this.#tripPoints);

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearEventsList();
    this.#renderPointList();
  };

}