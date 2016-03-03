import React, { Component, PropTypes } from 'react';

export default class FollowList extends Component {

  constructor(props) {
    super(props);
  }

  _handleTouchTap(userName) {
    const { navigate } = this.props;
    navigate(`/settings/${userName}`);
  }

  render () {
    const { users } = this.props;

    return (
        <ul>
          {
            users.map(user => <li
              key={user.name}>
              {user.name}
              {<img src={user.picture} onClick={this._handleTouchTap.bind(this, user.name)} />}
            </li>
            )
          }
        </ul>
    );
  }
}

FollowList.propTypes = {
  users: PropTypes.array,
  navigate: PropTypes.func
};
