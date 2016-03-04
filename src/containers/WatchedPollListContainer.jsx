import { connect } from 'react-redux';

import WatchedPollList from '../components/WatchedPollList';
import { setWatchedPolls } from '../actions/people';

export default connect(
  state => ({watchedPolls: state.watchedPolls, auth: state.auth }),
  setWatchedPolls
)(WatchedPollList);
