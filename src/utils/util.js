const getRandomNumber = (min, max) => {
  if (min < max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
  }
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscKeyDown = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


export { getRandomNumber, getRandomArrayElement, isEscKeyDown };
