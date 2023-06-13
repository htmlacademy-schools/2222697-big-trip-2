import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../consts.js';

const createSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--${SortType.DAY}">
      <input ${currentSortType === SortType.DAY ? 'checked' : ''} id="sort-${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      value="sort-${SortType.DAY}" data-sort-type="${SortType.DAY}" checked>
        <label class="trip-sort__btn" for="sort-${SortType.DAY}">Day</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--event">
      <input ${currentSortType === SortType.EVENT ? 'checked' : ''} id="sort-${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      value="sort-${SortType.EVENT}" data-sort-type=${SortType.EVENT} disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
      <input ${currentSortType === SortType.TIME ? 'checked' : ''} id="sort-${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      value="sort-${SortType.TIME}" data-sort-type="${SortType.TIME}">
        <label class="trip-sort__btn" for="sort-${SortType.TIME}">Time</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
      <input ${currentSortType === SortType.PRICE ? 'checked' : ''} id="sort-${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      value="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}">
        <label class="trip-sort__btn" for="sort-${SortType.PRICE}">Price</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--offer">
      <input ${currentSortType === SortType.OFFER ? 'checked' : ''} id="sort-${SortType.OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      value="sort-${SortType.OFFER}" data-sort-type=${SortType.OFFER} disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

}
