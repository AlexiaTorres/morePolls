import { connect } from 'react-redux';
import NotificationsDetail from '../components/NotificationsDetail';
import * as notificationsActions from '../actions/notify';

export default connect(
	state => ({messages: state.messages}),
	notificationsActions
)(NotificationsDetail);
