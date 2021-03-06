import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { fetchPosts, fetchComments, removeArticles } from '../actions';
import Weather from './Weather';
import CurrentDate from './Date';
import SubredditSelector from './SubredditSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const App = ({ subreddit, fetchPosts, posts, fetchComments, articles, removeArticles }) => {

  const [clickState, setClickState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (articles.length > 10) {
      setLoading(false)
    }
    else {
      setLoading(true)
    }
  }, [articles, setLoading])

  useEffect(() => {
    removeArticles();
    const getPosts = async () => {
      await fetchPosts(subreddit);
    }
    getPosts();
  }, [subreddit, fetchPosts, removeArticles, setLoading]);

  //once posts are fetched, using id to fetch each post's comments
  useEffect(() => {
    const commentsList = () => {
      posts.map(post => {
        return fetchComments(`/${post.data.id}.json`, post);
      })
    }
    commentsList();
  }, [posts, fetchComments])

  //lister for escape keydown to remove subreddit component state
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setClickState(false);
      }
    }
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    }
  })



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
          <section
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
                {/* Check if second comment exits */}
                {article['articleComments'][0][1] ?
                  <li>
                    <span className="author-line">User:
                   <span className="author-name">{article['articleComments'][0][1].data.author}</span> says </span> <br />
                    {alterLongComment(article['articleComments'][0][1].data)}
                  </li> : null}
              </ul>
            </div>
          </section>

        )
      })
    }
  }

  const renderLoader = () => {
    return (
      <div className="loader-container">
        <Loader type="Grid" color="rgb(44,44,44)" height={150}
          timeout={5000}
        />
      </div>
    )
  }





  return (
    <div className="main-container">
      <header className="header-container">
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
          />
        </div>
        <div className='header-center'>
          <h1>The Reddit Daily</h1>
        </div>
        <div className="header-right">
          <h4>LATEST <br /> EDITION</h4>
        </div>
      </header>

      <div className='sub-header'>
        <div className="weather">
          <Weather />
        </div>
        <div className="date">
          <CurrentDate />
        </div>
      </div>

      <main className='main-grid'>
        {loading ? renderLoader() : renderArticles()}
      </main>
      <footer className="footer-container">
        <a href="https://david-w.dev">Created By David Williamson</a>
      </footer>

    </div>
  )
}

const mapStateToProps = ({ subreddit, posts, articles }) => {
  return { subreddit, posts, articles }
}

export default connect(mapStateToProps, { fetchPosts, fetchComments, removeArticles })(App)
