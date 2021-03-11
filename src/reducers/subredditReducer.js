import { SET_SUBREDDIT } from '../actions/types';


export default function (state = 'worldnews', action) {
  switch (action.type) {
    case SET_SUBREDDIT:
      return action.payload;
    default:
      return state;
  }
}