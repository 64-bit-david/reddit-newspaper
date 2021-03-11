import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import postsReducer from './postsReducer';
import subredditReducer from './subredditReducer';

export default combineReducers({
  posts: postsReducer,
  articles: articlesReducer,
  subreddit: subredditReducer
})