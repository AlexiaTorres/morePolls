import { connect } from 'react-redux';
import Register from '../components/Register';
import * as authActions from '../actions/auth';

export default connect(
state => ({auth: state.auth, userExistsError: state.registerAlert}),
  authActions
)(Register);
