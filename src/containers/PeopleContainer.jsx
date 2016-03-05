import { connect } from 'react-redux';

import People from '../components/People';
import * as peopleSearchActions from '../actions/people';

function mapStateToProps(state) {
  return {
    users: state.people
  };
}

export default connect(
  mapStateToProps, peopleSearchActions
)(People);
