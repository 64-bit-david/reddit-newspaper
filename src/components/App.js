import { useEffect, useState } from 'react';
import fetchReddit from '../apis/fetchReddit';




const App = () => {

  const [posts, setPosts] = useState([]);

  const [articles, setArticles] = useState([]);

  const [clickState, setClickState] = useState(false);




  const fetchPosts = async () => {
    const res = await fetchReddit.get('/r/worldnews.json');
    const postsArray = res.data.data.children;
    const postsWithstickiedRemoved = postsArray.filter(post => !post.data.stickied);
    setPosts(postsWithstickiedRemoved.slice(0, 10));
  }


  const fetchComments = async (postLink, post) => {
    const res = await fetchReddit.get(postLink);
    const article = { articleTitle: post.data.title, articleComments: [res.data[1].data.children.slice(0, 2)], articleMeta: post }
    setArticles((prevState) => ([...prevState, article]))
  }


  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const commentsList = () => {
      posts.map(post => {
        return fetchComments(`/${post.data.id}.json`, post);
      })
    }
    commentsList();
  }, [posts])


  const renderArticles = () => {
    if (articles.length > 0) {
      return articles.map(article => {
        return (
          <div className="grid-item" key={article.articleMeta.data.id}>
            <h2 className="grid-item-header">{article.articleTitle}</h2>
            <div>
              {/* Need to check if comments exists */}
              <ul>
                {article['articleComments'][0][0].data.body ?
                  <li>
                    {article['articleComments'][0][0].data.body}
                  </li> :
                  <li> No Comments Yet!</li>}

                {article['articleComments'][0][1] ?
                  <li>
                    {article['articleComments'][0][1].data.body}
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
