import { render } from '../render';
import PointEdit from '../view/point-edit';
import PointView from '../view/point';
import SortView from '../view/sort';
import TripList from '../view/trip-list';

export default class Trip {
  constructor() {
    this.component = new TripList();
  }

  init(container, pointsModel) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.pointsList = [...this.pointsModel.getPoint()];

    render(new SortView(), this.container);
    render(this.component, this.container);
    render(new PointEdit(this.pointsList[0]), this.component.getElement());

    for (let i = 0; i < this.pointsList.length; i++) {
      render(new PointView(this.pointsList[i]), this.component.getElement());
    }
  }
}