import { render, replace, remove } from '../framework/render.js';
import PointEditView from '../view/point-edit';
import PointView from '../view/point';
import { isEscKeyDown } from '../utils/utils';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {

  #point = null;
  #mode = Mode.DEFAULT;

  #pointsListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  constructor(pointsListContainer, changeData, changeMode) {
    this.#pointsListContainer = pointsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setCloseClickHandler(this.#handleCloseClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (isEscKeyDown) {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();

  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();

  };

  #handleCloseClick = () => {
    this.#replaceFormToPoint();

  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

}