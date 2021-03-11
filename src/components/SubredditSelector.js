import React from 'react';
import { connect } from 'react-redux';
import { selectSubreddit } from '../actions';

const SubredditSelector = ({ clickState, setClickState, subreddit, selectSubreddit }) => {

  const subRedditList = ['worldnews', 'news', 'upliftingnews', 'askreddit', 'politics', 'nottheonion', 'ukpolitics', 'technology', 'science', 'futurology',];

  const renderSubReddits = () => {
    return (
      <div>
        <h4>Select a subreddit</h4>
        <ul className="subreddit-list">{subRedditList.map((item, index) => {
          return (
            <li key={item}>
              <button onClick={() => {
                selectSubreddit(index)
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

const mapStateToProps = ({ subreddit }) => {
  return ({ subreddit })
}

export default connect(mapStateToProps, { selectSubreddit })(SubredditSelector)
