import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';
import { throttle } from 'lodash';

const progressContex = [
  'progress-bar-success',
  'progress-bar-info',
  'progress-bar-warning',
  'progress-bar-danger'
];

export default class PollVote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      unvote: false};
  }

  componentWillMount() {
    this.props.registerListeners(this.props.params);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.unregisterListeners(this.props.params);
  }

  handleVoteClick(idPoll, idEntry, creator) {
    this.props.voteEntry(idPoll, idEntry, creator);
    this.setState({ unvote: true});
  }

  handleUnvoteClick(idPoll, idEntry) {
    this.props.unvoteEntry(idPoll, idEntry);
  }

  handleChangeVoteClick(idPoll, newIdEntry, oldIdEntry) {
    this.props.changeVote(idPoll, newIdEntry, oldIdEntry);
  }

  totalVotes(entries) {
    return Object.keys(entries).reduce( (total, id) => total + entries[id].votes, 0 );
  }

  createProgressBar(entry, totalVotes, index) {
    return (
      <div className="progress">
        <div className={ `progress-bar ${ progressContex[index % progressContex.length] } progress-bar-striped` } role="progressbar" style={{'width': entry.votes * 100 / (totalVotes || Infinity) + '%'}}>
          { entry.votes || 0 }
        </div>
      </div>
    );
  }

  render() {
    const { poll, auth, hasVoted, votedEntry } = this.props;
    const entries = poll.entries || {};
    const total = this.totalVotes(entries);
    const contents = this.state.loading ? <Spinner /> : <div>
        <div className="panel-heading">
            <h4>
              <div>
                Poll: { poll.title }
              </div>
            </h4>
             </div>
            <div className="panel-body">
              <h4>Entries</h4>
              <ul className="list-group">
                {
                  Object.keys(entries).sort((idX, idY) => entries[idY].votes - entries[idX].votes).map( (id, index) =>
                    <li className="list-group-item" key={index}>
                      { entries[id].title }
                      { (auth.authenticated && !hasVoted && poll.state === 'unlocked') ? <span onClick={throttle(() => this.handleVoteClick(poll.id, id, poll.creator), 10000) } className="action-element glyphicon glyphicon-arrow-up"/> : null }
                      { hasVoted && ( votedEntry === id ) ? <span onClick={ throttle(() => this.handleUnvoteClick(poll.id, id), 10000) } className="action-element glyphicon glyphicon-arrow-down"/> : null }
                      { hasVoted && ( votedEntry !== id ) ? <button className="btn btn-danger" type="button" onClick={ throttle(() => this.handleChangeVoteClick(poll.id, id, votedEntry), 10000) }>Change vote</button> : null }
                      <br/>
                      { this.createProgressBar(entries[id], total, index) }
                    </li>
                  )
                }
             </ul>
        </div>
      </div>;
    return (
      <div className="panel panel-default">
        { contents }
      </div>
    );
  }
}

PollVote.propTypes = {
  auth: PropTypes.object.isRequired,
  poll: PropTypes.object.isRequired,
  voteEntry: PropTypes.func.isRequired,
  unvoteEntry: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired,
  hasVoted: PropTypes.bool.isRequired,
  changeVote: PropTypes.func.isRequired,
  votedEntry: PropTypes.string.isRequired
 };

PollVote.defaultProps = {
  hasVoted: true
};
