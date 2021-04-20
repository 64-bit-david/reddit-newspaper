import { FETCH_COMMENTS, REMOVE_ARTICLES } from '../actions/types';

export default function func(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return [...state, action.payload];
    case REMOVE_ARTICLES:
      return [];
    default:
      return state;
  }
}
