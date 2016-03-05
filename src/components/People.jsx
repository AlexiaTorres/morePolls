import React, { Component, PropTypes } from 'react';
//import { Link } from 'react-router';
import Spinner from './Spinner';

export default class People extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.clearPeopleSearch();
  }

  handleOnChangename() {
    const node = this.refs.name;
    const name =  node.value;
    this.setState({ loading: true });
    this.props.peopleSearch(name);
  }

  handleWatchUser(user){
    const { registerListeners } = this.props;
    registerListeners(user.id);
  }

  render() {
    const { users } = this.props;
    const noResults = users.length === 0 ? 'No results' : null;
    return ( <div className="row">
        <div className="col-md-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search people" ref="name" onChange={e => this.handleOnChangename(e)}/>
            <span className="input-group-btn">
              <button className="btn btn-info" type="button" onClick={e => this.handleOnChangename(e)}><span className="glyphicon glyphicon-search" /></button>
            </span>
          </div>
          <br/>
          { this.state.loading ? <Spinner /> : (<div>
            <ul className="list-group">
              {
                users.map( (user, index) =>  <li className="list-group-item" key={index} onClick={() => this.handleWatchUser(user)}> {user.name}</li> )
              }
           </ul>
           <h4>{ noResults }</h4>
          </div>)}
        </div>
      </div>
    );
  }
}

People.propTypes = {
  users: PropTypes.array,
  peopleSearch: PropTypes.func.isRequired,
  clearPeopleSearch: PropTypes.func.isRequired,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired,
  navigate: PropTypes.func
};

People.defaultProps = {
  users: []
};
