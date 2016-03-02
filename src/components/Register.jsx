import React, { Component, PropTypes } from 'react';

export default class Register extends Component {

  constructor(props) {
    super(props);
  }

  handleRegister(){
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

  render() {
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
      <button type="submit" className="btn btn-primary" onClick={ (e) => { e.preventDefault(); this.handleRegister();} }>Register</button>
    </form>
    </div>
    );
  }

}

Register.propTypes = {
  createUser: PropTypes.func.isRequired
};
