import { connect } from 'react-redux';

import WatchedPollList from '../components/WatchedPollList';
import * as peopleActions from '../actions/people/';

export default connect(
  state => ({watchedPolls: state.watchedPolls, auth: state.auth }),
  peopleActions
)(WatchedPollList);
