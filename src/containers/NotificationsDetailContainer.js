import { connect } from 'react-redux';
import * as notificationsActions from '../actions/notify';
import NotificationsDetail from '../components/NotificationsDetail';

export default connect(
	state => ({messages: state.messages}),
	notificationsActions
)(NotificationsDetail);
