import { connect } from 'react-redux';
import Login from '../components/Login';
import * as authActions from '../actions/auth';

export default connect(
  state => state.auth,
  authActions
)(Login);
