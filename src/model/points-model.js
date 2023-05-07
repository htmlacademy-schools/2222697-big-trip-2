import { createPoint } from '../mock/point';

export default class pointsModel {
  constructor() {
    this.point = Array.from({ length: 5 }, createPoint);
  }

  getPoint() {
    return this.point;
  }
}