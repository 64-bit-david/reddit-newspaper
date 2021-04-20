import { FETCH_POSTS } from '../actions/types';

export default function func(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
}