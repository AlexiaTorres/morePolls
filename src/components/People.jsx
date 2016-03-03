import React, { Component, PropTypes } from 'react';
//import { Link } from 'react-router';
import Spinner from './Spinner';
import FollowList from './FollowList';

export default class People extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
/*
  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.clearWatchedPeople();
  }

  handleOnChangeTitle() {
    const node = this.refs.title;
    const title =  node.value;
    this.setState({ loading: true });
    this.props.watchedPeople(title);
  }

  render() {
    const { people } = this.props;
    const noResults = people.length === 0 ? 'No results' : null;*/
    componentWillMount(){
    const { auth, registerListeners } = this.props;
    debugger;
    registerListeners(auth.name);
  }

  componentWillUnmount(){
    const { auth, unregisterListeners } = this.props;
    unregisterListeners(auth.name);
  }

  _handleSearchChange(){
    const { searchPeople } = this.props;
    const searchTerm = this.refs.search.getValue();
    searchPeople(searchTerm);
  }

  render() {
    const { followers, following, watchedPeople } = this.props;
    return(
      <div className="row">
        <div className="col-md-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Pull Title" ref="title" onChange={e => this.handleOnChangeTitle(e)}/>
            <span className="input-group-btn">
              <button className="btn btn-info" type="button" onClick={e => this.handleOnChangeTitle(e)}><span className="glyphicon glyphicon-search" /></button>
            </span>
          </div>
          <br/>
          { this.state.loading ? <Spinner /> : (<div>
            <ul className="list-group">
              <FollowList users={following}/>
              <FollowList users={followers}/>
              <FollowList users={watchedPeople}/>
           </ul>
          </div>)}
        </div>
      </div>
    );
  }
}

People.propTypes = {
  followers: PropTypes.object,
  following: PropTypes.object,
  searchPeople: PropTypes.func,
  watchedPeople: PropTypes.array,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  auth: PropTypes.object
};

People.defaultProps = {
  watchedPeople: []
};
