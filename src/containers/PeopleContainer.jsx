import { connect } from 'react-redux';

import People from '../components/People';
import * as peopleActions from '../actions/people';

function mapStateToProps(state) {
  const { user, followers, following, auth, watchedPeople } = state;
  return {
    user, followers, following, auth, watchedPeople
  };
}

export default connect(
  mapStateToProps, peopleActions
)(People);
