import { render, remove, RenderPosition } from '../framework/render.js';
import PointEditView from '../view/point-edit';
import { isEscKeyDown } from '../utils/util';
import { UpdateType, UserAction } from '../consts.js';
import { nanoid } from 'nanoid';

export default class PointNewPresenter {

  #pointsListContainer = null;
  #changeData = null;

  #destroyCallback = null;
  #pointEditComponent = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #destinations = null;
  #offers = null;

  constructor(pointsListContainer, changeData, pointsModel, destinationsModel, offersModel) {
    this.#pointsListContainer = pointsListContainer;
    this.#changeData = changeData;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#pointEditComponent = new PointEditView({
      destination: this.#destinations,
      offers: this.#offers,
      isNewPoint: true
    });

    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }
    this.#destroyCallback();
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (isEscKeyDown(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}