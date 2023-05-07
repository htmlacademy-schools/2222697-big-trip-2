import { createElement } from '../render';

const createTripListTemplate = () => (
  `<ul class="trip-events__list">
    </ul>`
);

export default class TripList {
  getTemplate() {
    return createTripListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}