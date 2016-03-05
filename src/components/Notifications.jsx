import React, { Component, PropTypes } from 'react';
import MenuItem from './MenuItem';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { auth, registerListeners } = this.props;
    registerListeners(auth.id);
  }

  componentWillReceiveProps(newProps) {
    const { auth, registerListeners, unregisterListeners } = this.props;
    if (newProps.auth.id !== auth.id) {
      unregisterListeners(auth.id);
      newProps.auth.id && registerListeners(newProps.auth.id);
    }
  }

  componentWillUnmount() {
    const { auth, unregisterListeners } = this.props;
    unregisterListeners(auth.id);
  }

  render() {
    const { pending, total, active } = this.props;
    let className = 'badge';
    if (pending  > 0) {
      className += ' badge-info';
    } else if (total !== 0) {
      className += ' badge-success';
    }
    return (
        <MenuItem href="/notifications" active={ active }>Messages <span className={ className }>{total === 0 ? 0 : `${pending}/${total}`}</span></MenuItem>
    );
  }
}

Notifications.propTypes = {
  total: PropTypes.number,
  pending: PropTypes.number,
  auth: PropTypes.object,
  active: PropTypes.string.isRequired,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func
};

Notifications.defaultProps = {
  total: 0,
  pending: 0
};
