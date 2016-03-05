import { connect } from 'react-redux';

import WatchedPollList from '../components/WatchedPollList';
import { setWatchedPolls } from '../actions/people/actions';
import { registerListeners, unregisterListeners } from '../actions/people/listeners';

export default connect(
  state => ({watchedPolls: state.watchedPolls, auth: state.auth }),
  setWatchedPolls,
  registerListeners,
  unregisterListeners
)(WatchedPollList);
