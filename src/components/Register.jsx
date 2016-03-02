import React, { Component, PropTypes } from 'react';

export default class Register extends Component {

  constructor(props) {
    super(props);
  }

 _handleRegister(){
    const { createUser } = this.props;
    const userName = this.refs.userName.value.trim();
    const pass = this.refs.pass.value.trim();
    const pass2 = this.refs.pass2.value.trim();
    if (this.checkPass(pass, pass2)) {
      createUser(userName, pass);
    }
  }

  checkPass(pass, pass2){
    return (pass === pass2) ?  true : false;
  }

  handleError(){
   setTimeout( () => {
     this.props.registerError();
   }, 1000);
 }

  render() {
    const { userExistsError } = this.props;
    return (
      <div style={{textAlign: 'center', margin:'2em auto 2em', justifyContent: 'center'}}>
        <h2>Welcome to Poll App</h2>
        <h3>Register</h3>
        <form role="form">
          <div className="form-group">
            <label>User name</label>
            <input type="text" className="form-control" ref="userName" placeholder="User name"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" ref="pass"  placeholder="Password"/>
          </div>
          <div className="form-group">
            <label>Re-type Password</label>
            <input type="password" className="form-control" ref="pass2"  placeholder="Password"/>
          </div>
          {(userExistsError) ?
               (<div className="alert animated fadeInRight" style={{ opacity: 0.9}}>
                   <div className="alert alert-danger" role="alert">{userExistsError}</div>
               </div>)
               : null }
                {(userExistsError) ? this.handleError() : null }
          <button type="submit" className="btn btn-primary" onClick={ (e) => { e.preventDefault(); this._handleRegister();} }>Register</button>
        </form>
      </div>
    );
  }

}

Register.propTypes = {
  createUser: PropTypes.func.isRequired,
  userExistsError: PropTypes.string.isRequired,
  registerError: PropTypes.func.isRequired
};
