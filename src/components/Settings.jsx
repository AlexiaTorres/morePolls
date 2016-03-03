'use strict';

import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    const { settings } = props;
    const name =  settings && settings.name;
    const picture =  settings && settings.picture;
    const user = settings && settings.user;
    const password = settings && settings.password;
    this.state = { name, picture, user, password, editing: false };
  }

  componentWillReceiveProps(nextProps) {
    const { settings } = nextProps;
    const name =  settings && settings.name;
    const picture =  settings && settings.picture;
    const user = settings && settings.user;
    const password = settings && settings.password;
    this.setState({ name: name || user, picture: picture, password: password});
  }

  saveSettingsClick() {
    const { name, picture, user, password } = this.refs;
    const settings = {
      name: name.value || user.value,
      password: password.value
    };

    if (picture.value) {
      settings.picture = picture.value;
    }

    this.setState({
      editing: false
    });

    this.props.saveSettings(settings);
  }

  onChange() {
    const { name, picture, user, password } = this.refs;
    this.setState({
      name: name.value || user.value,
      picture: picture.value,
      password: password.value,
      editing: true
    });
  }

  render() {
    const name = this.state.name || this.state.user;
    const picture = this.state.picture;
    const password = this.state.password;
    const editing = this.state.editing;
    const { saving } = this.props;

    return (
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Settings</h3>
          </div>
          <div className="panel-body">
            <div className="input-group">
              <span className="input-group-addon">Name</span>
                <input disabled={ saving } type="text" className="form-control" ref="name" value={ name } onChange={(e) => this.onChange(e)}/>
            </div>
            <br/>
            <div className="input-group">
              <span className="input-group-addon">Picture</span>
                <input disabled={ saving } type="text" className="form-control" ref="picture" value={ picture } onChange={(e) => this.onChange(e)}/>
            </div>
             <br/>
            <div className="input-group">
              <span className="input-group-addon">Password</span>
                <input disabled={ saving } type="password" className="form-control" ref="password" value={ password } onChange={(e) => this.onChange(e)}/>
            </div>
          </div>
          <div className="panel-footer">
              <button  disabled={ !editing || saving } className="btn btn-success" onClick={ () => this.saveSettingsClick() }>{ saving ? <Spinner /> : 'Save' }</button>
            </div>
        </div>

    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object,
  saveSettings: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default Settings;
