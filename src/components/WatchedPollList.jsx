import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';
import { Link } from 'react-router';
import { formatDate } from '../utils/formatDate';

export default class WatchedPollList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.props.registerListeners();
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.unregisterListeners();
  }


  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {

    const { watchedPolls } = this.props;

    return (
      <div className="row">
        <div className="col-md-6">
          {
            this.state.loading ?
              <Spinner /> :
            (
              <ul className="list-group">
                {
                 watchedPolls.map( (poll, index) =>
                  <li key={index}>
                  <Link to={`/vote/${poll.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>
                    {poll.title}
                    {
                      poll.createdAt && <span style={{marginLeft: '1em'}}>{formatDate(poll.createdAt)}</span>
                    }
                  </Link>
                </li>
                )
                 }
              </ul>
            )
           }
        </div>
      </div>
    );
  }
}

WatchedPollList.propTypes = {
  watchedPolls: PropTypes.array,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func
};

WatchedPollList.defaultProps = {
  watchedPolls: []
};
