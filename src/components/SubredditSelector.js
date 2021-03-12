import React from 'react';
import { connect } from 'react-redux';
import subRedditList from './subredditList';
import { selectSubreddit } from '../actions';

const SubredditSelector = ({ clickState, setClickState, selectSubreddit }) => {

  const renderSubReddits = () => {
    return (
      <div className="s-list-container">
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
