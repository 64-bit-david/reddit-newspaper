import React from 'react'

const SubredditSelector = ({ clickState, setClickState, subreddit, setSubreddit }) => {

  const subRedditList = ['worldnews', 'news', 'upliftingnews', 'askreddit', 'politics', 'nottheonion', 'ukpolitics', 'technology', 'science', 'futurology',];

  const renderSubReddits = () => {
    return (
      <div>
        <h4>Select a subreddit</h4>
        <ul className="subreddit-list">{subRedditList.map(item => {
          return (
            <li key={item}>
              <button onClick={() => {
                setSubreddit(item)
                setClickState(!clickState)
              }
              }>
                /r/{item}
              </button>
            </li>
          )
        })
        }
        </ul>
      </div>
    )
  }

  return (
    <div className={`subreddit-list-container ${clickState && 'active'}`}>
      {renderSubReddits()}
    </div>
  )
}

export default SubredditSelector
