import { FETCH_POSTS, FETCH_COMMENTS, SET_SUBREDDIT, REMOVE_ARTICLES } from "./types";
import fetchReddit from '../apis/fetchReddit';

export const fetchPosts = (subreddit) => async (dispatch) => {
  const res = await fetchReddit.get(`/r/${subreddit}.json`);
  const postsArray = res.data.data.children;
  //filter out any stickied posts in array
  const postsWithstickiedRemoved = postsArray.filter(post => !post.data.stickied);
  dispatch({ type: FETCH_POSTS, payload: postsWithstickiedRemoved.slice(0, 21) })
}

export const fetchComments = (postId, post) => async (dispatch, getState) => {
  const res = await fetchReddit.get(postId);
  const comments = res.data[1].data.children;
  const commentsWithStickedRemoved = comments.filter(comment => {
    return (!comment.data.stickied && comment.data.author_flair_text !== "BOT" && comment.data.body !== "[removed]");
  })
  const article = { articleTitle: post.data.title, articleComments: [commentsWithStickedRemoved.slice(0, 2)], articleMeta: post }

  dispatch({ type: FETCH_COMMENTS, payload: article })
}

export const removeArticles = () => {
  return { type: REMOVE_ARTICLES }
}

export const selectSubreddit = (subredditClicked) => {
  const subredditList = ['worldnews', 'news', 'upliftingnews', 'askreddit', 'politics', 'nottheonion', 'ukpolitics', 'technology', 'science', 'futurology',];
  return { type: SET_SUBREDDIT, payload: subredditList[subredditClicked] }
}