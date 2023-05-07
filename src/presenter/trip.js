import { render } from '../render';
import PointEdit from '../view/point-edit';
import PointView from '../view/point';
import SortView from '../view/sort';
import TripList from '../view/trip-list';
import NoPointView from '../view/no-point';

export default class Trip {
  #tripList = null;
  #container = null;
  #pointsModel = null;

  #pointsList = []
  constructor() {
    this.#tripList = new TripList();
  }

  init(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#pointsList = [...this.#pointsModel.point];

    if (this.#pointsList.length === 0) {
      return render(new NoPointView(), this.#container);
    }

    render(new SortView(), this.#container);
    render(this.#tripList, this.#container);
    // render(new PointEdit(this.#pointsList[0]), this.#component.element);

    for (let i = 0; i < this.#pointsList.length; i++) {
      this.#renderPoint(this.#pointsList[i]);
    }
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEdit(point);

    const replaceEditToPoint = () => {
      this.#tripList.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const replacePointToEdit = () => {
      this.#tripList.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#tripList.element);
  }
}