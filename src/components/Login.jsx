import React, { Component, PropTypes } from 'react';

export default class Login extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit(){
    const { logIn } = this.props;
    const userName = this.refs.userName.value.trim();
    const pass = this.refs.pass.value.trim();
     logIn(userName, pass);
  }

  handleError(){
    setTimeout( () => {
      this.props.registerError();
    }, 1000);
  }


  render() {
    const { error } = this.props;
    return (
      <div style={{textAlign: 'center', margin:'2em auto 2em', justifyContent: 'center'}}>
        <h2>Welcome to Poll App</h2>
        <h3>Sign in</h3>
        <div style={{textAlign: 'center', margin:'2em auto 2em', display: 'flex', justifyContent: 'center'}}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label> User name </label>
              <input className="form-control" ref="userName" placeholder="User name"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input ref="pass" type="password" className="form-control" placeholder="Password" />
               {(error) ?
               (<div className="alert animated fadeInRight" style={{ opacity: 0.9}}>
                   <div className="alert alert-danger" role="alert">{error}</div>
               </div>)
               : null }
                {(error) ? this.handleError() : null }
            </div>
            <button type="submit" className="btn btn-primary" onClick={ (e) => {e.preventDefault(); this.handleSubmit();} }>Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  registerError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};
