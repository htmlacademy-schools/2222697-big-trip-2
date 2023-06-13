import { FilterType } from '../consts';
import { isPointFuture, isPointPast } from './point';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point))
};

export { filter };
