import { useEffect, useState } from 'react';
import fetchReddit from '../apis/fetchReddit';




const App = () => {

  const [posts, setPosts] = useState([]);

  const [articles, setArticles] = useState([]);

  const [clickState, setClickState] = useState(false);

  // const [subreddit, setSubreddit] = useState('/r/upliftingnews')


  // gets top level posts from subreddit endpoint, filters out any stickied posts and returns a certain amount
  //askscience/top/.json?sort=top
  const fetchPosts = async () => {
    const res = await fetchReddit.get('/r/ukpolitics.json');
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



  //helper function that shortens long comments, and prompts user to read the rest on reddit
  const alterLongComment = (commentText, index) => {
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



  //helper function that renders posts and comments fetched 
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
            <h2 className="grid-item-header">{article.articleTitle}</h2>
            <div>
              {/*  Need to check if comments exists  */}
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

  const dateFormatter = () => {
    const today = new Date();
    const dd = String(today.getDay());
    const dofm = String(today.getDate());
    const mm = String(today.getMonth());
    const yyyy = today.getFullYear();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const daysOfMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    const date = `${days[dd]} ${months[mm]} ${daysOfMonth[dofm]} ${yyyy}`

    return date;
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
          <p>{dateFormatter()}</p>
        </div>
        {/* <div className="price">
          <p>Price: 3 Shrootbucks</p>
        </div> */}
      </div>

      <div className='main-grid'>

        {renderArticles()}
        {dateFormatter()}


      </div>

    </div>
  )
}

export default App
