import { connect } from 'react-redux';
import Notifications from '../components/Notifications';
import * as notificationsActions from '../actions/notify';

function mapStateToProps(state) {
  return {
    total: state.messages.length,
    pending: state.messages.filter( message => message.pending ).length
  };
}

export default connect(
  mapStateToProps,
  notificationsActions
)(Notifications);
