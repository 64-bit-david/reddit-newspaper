import { useEffect, useState } from 'react';
import fetchReddit from '../apis/fetchReddit';




const App = () => {

  const [posts, setPosts] = useState([]);

  const [articles, setArticles] = useState([]);

  const [clickState, setClickState] = useState(false);


  // gets top level posts from subreddit endpoint, filters out any stickied posts and returns a certain amount
  const fetchPosts = async () => {
    const res = await fetchReddit.get('/r/news.json');
    const postsArray = res.data.data.children;
    const postsWithstickiedRemoved = postsArray.filter(post => !post.data.stickied);
    setPosts(postsWithstickiedRemoved.slice(0, 21));
  }

  //fetches comments from post's fetched ids.
  // filters out stickied, removed and bot comments
  const fetchComments = async (postId, post) => {
    const res = await fetchReddit.get(postId);
    const comments = res.data[1].data.children;
    const commentsWithStickedRemoved = comments.filter(comment => {
      return (!comment.data.stickied && comment.data.author_flair_text !== "BOT" && comment.data.body !== "[removed]");
    })
    const article = { articleTitle: post.data.title, articleComments: [commentsWithStickedRemoved.slice(0, 2)], articleMeta: post }
    setArticles((prevState) => ([...prevState, article]))
  }


  useEffect(() => {
    fetchPosts();
  }, []);

  //once posts are fetched, using id to fetch each post's comments
  useEffect(() => {
    const commentsList = () => {
      posts.map(post => {
        return fetchComments(`/${post.data.id}.json`, post);
      })
    }
    commentsList();
  }, [posts])



  const alterLongComment = (commentText, index) => {
    console.log(commentText)
    if (commentText.body.length < 200) return commentText.body;
    if (commentText.body.length > 200) {
      return (
        <div>
          {commentText.body.slice(0, 200)}...<br />
          <a href={`https://www.reddit.com${commentText.permalink}`} className="reddit-comment-link">
            Continue on reddit
          </a>
        </div>
      )
    }
  }



  const renderArticles = () => {
    if (articles.length > 0) {
      return articles.map((article, index) => {
        return (
          <div
            className={`grid-item
             ${(article.articleTitle.length > 80 && index > 1) ? 'long-header' : ''} `}
            key={article.articleMeta.data.id}
          >
            <h2 className="grid-item-header">{article.articleTitle}</h2>
            <div>
              {/* Need to check if comments exists */}
              <ul>
                {article['articleComments'][0][0] ?
                  <li>
                    <span className="author-line">User:
                    <span className="author-name"> {article['articleComments'][0][0].data.author}</span> says </span><br />
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
          <button onClick={() => setClickState(!clickState)}>/r/worldnews</button>
        </div>
        <div className='header-center'>
          <h1>The Reddit Daily</h1>
        </div>
        <div className="header-right">
          <h4>LATEST <br /> EDITION</h4>
        </div>
      </div>

      <div className='sub-header'>
        {/* <div className="weather">
          <p>WEATHER - Scattered clouds with a chance of rain</p>
        </div> */}
        <div className="date">
          <p>March 08 2020</p>
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

export default App
