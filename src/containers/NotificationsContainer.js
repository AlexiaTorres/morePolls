import { connect } from 'react-redux';
import * as notificationsActions from '../actions/notify';
import Notifications from '../components/Notifications';

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
