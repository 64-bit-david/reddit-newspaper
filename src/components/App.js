import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchComments, removeArticles } from '../actions';
import fetchReddit from '../apis/fetchReddit';
import Weather from './Weather';
import CurrentDate from './Date';
import SubredditSelector from './SubredditSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';




const App = ({ subreddit, fetchPosts, posts, fetchComments, articles, removeArticles }) => {

  // const [posts, setPosts] = useState([]);


  const [clickState, setClickState] = useState(false);

  // const [subreddit, setSubreddit] = useState('ukpolitics');






  // gets top level posts from subreddit endpoint, filters out any stickied posts and returns a certain amount
  //askscience/top/.json?sort=top
  // const fetchPosts = async () => {
  //   const res = await fetchReddit.get(`/r/${subreddit}.json`);
  //   const postsArray = res.data.data.children;
  //   const postsWithstickiedRemoved = postsArray.filter(post => !post.data.stickied);
  //   setPosts(postsWithstickiedRemoved.slice(0, 21));
  // }

  //fetches comments from post's fetched ids.
  // filters out stickied, removed and bot comments
  // const fetchComments = async (postId, post) => {
  //   const res = await fetchReddit.get(postId);
  //   const comments = res.data[1].data.children;
  //   const commentsWithStickedRemoved = comments.filter(comment => {
  //     return (!comment.data.stickied && comment.data.author_flair_text !== "BOT" && comment.data.body !== "[removed]");
  //   })
  //   const article = { articleTitle: post.data.title, articleComments: [commentsWithStickedRemoved.slice(0, 2)], articleMeta: post }
  //   setArticles((prevState) => ([...prevState, article]))
  // }


  useEffect(() => {
    removeArticles();
    fetchPosts(subreddit);
  }, [subreddit]);

  //once posts are fetched, using id to fetch each post's comments
  useEffect(() => {
    const commentsList = () => {
      posts.map(post => {
        return fetchComments(`/${post.data.id}.json`, post);
      })
    }
    commentsList();
  }, [posts])



  //get comment meta data, returns comment text
  //if comment exceeds 200chars, only return first 200 + option to read full text on reddit
  const alterLongComment = (comment, index) => {
    if (comment.body.length < 200) return comment.body;
    if (comment.body.length > 200) {
      return (
        <div>
          {comment.body.slice(0, 200)}...<br />
          <a href={`https://www.reddit.com${comment.permalink}`} className="reddit-comment-link">
            Continue on reddit
          </a>
        </div>
      )
    }
  }



  // renders posts and comments held in articles' state
  const renderArticles = () => {
    if (articles.length > 0) {
      return articles.map((article, index) => {
        return (
          <div
            //long-header class will slighly decrease font size
            className={`grid-item
             ${(article.articleTitle.length > 80 && index > 1) ? 'long-header' : ''} `}
            key={article.articleMeta.data.id}
          >
            <h2 className="grid-item-header">
              <a className="header-link" href={`https://www.reddit.com${article.articleMeta.data.permalink}`}>
                {article.articleTitle}
              </a>
            </h2>
            <div>
              {/*  Need to check if comments exists  */}
              <ul>
                {article['articleComments'][0][0] ?
                  <li>
                    <span className="author-line">User:
                  {/* get comment username */}
                      <span className="author-name"> {article['articleComments'][0][0].data.author}</span> says </span><br />
                    {/* Get comment meta */}
                    {alterLongComment(article['articleComments'][0][0].data)}
                  </li> :
                  <li> No Comments Yet!</li>}

                {article['articleComments'][0][1] ?
                  <li>
                    <span className="author-line">User:
                   <span className="author-name">{article['articleComments'][0][1].data.author}</span> says </span> <br />
                    {alterLongComment(article['articleComments'][0][1].data)}
                  </li> : null}
              </ul>
            </div>
          </div>

        )
      })
    }
  }





  return (
    <div className="main-container">
      <div className="header-container">
        <div className="header-left">
          <button
            onClick={() => setClickState(!clickState)}
          >/r/{subreddit}
            <span className="btn-symbol">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </button>
          <SubredditSelector
            clickState={clickState}
            setClickState={setClickState}
          // subreddit={subreddit}
          // setSubreddit={setSubreddit}
          />
        </div>
        <div className='header-center'>
          <h1>The Reddit Daily</h1>
        </div>
        <div className="header-right">
          <h4>LATEST <br /> EDITION</h4>
        </div>
      </div>

      <div className='sub-header'>
        <div className="weather">
          <Weather />
        </div>
        <div className="date">
          <CurrentDate />
        </div>
        {/* <div className="price">
          <p>Price: 3 Shrootbucks</p>
        </div> */}
      </div>

      <div className='main-grid'>

        {renderArticles()}


      </div>

    </div>
  )
}

const mapStateToProps = ({ subreddit, posts, articles }) => {
  return { subreddit, posts, articles }
}

export default connect(mapStateToProps, { fetchPosts, fetchComments, removeArticles })(App)
