import { render, RenderPosition } from '../render';
import PointEditView from '../view/point-edit';
import PointView from '../view/point';
import SortView from '../view/sort';
import TripList from '../view/trip-list';
const WAYPOINT_COUNT = 3;

export default class Trip {
  constructor({ container }) {
    this.component = new TripList();
    this.container = container;
  }

  init() {
    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new PointEditView(), this.component.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < WAYPOINT_COUNT; i++) {
      render(new PointView(), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}