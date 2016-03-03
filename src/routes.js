import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import App from './containers/App';
import PollListContainer from './containers/PollListContainer';
import PollDetailsContainer from './containers/PollDetailsContainer';
import NotificationsDetailContainer from './containers/NotificationsDetailContainer';
import SelectPollContainer from './containers/SelectPollContainer';
import PollVoteContainer from './containers/PollVoteContainer';
import SignInContainer from './containers/SignInContainer';
import SettingsContainer from './containers/SettingsContainer';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';
import PeopleContainer from './containers/PeopleContainer';

export default () => (
  <Route path="/" component={App}>
    <Route path="poll" component={PollListContainer} />
    <Route path="poll/:idPoll" component={PollDetailsContainer} />
    <Route path="notifications" component={NotificationsDetailContainer} />
    <Route path="vote" component={SelectPollContainer} />
    <Route path="vote/:idPoll" component={PollVoteContainer} />
    <Route path="sign-in" component={SignInContainer} />
    <Route path="settings" component={SettingsContainer} />
    <Route path="register" component={RegisterContainer} />
    <Route path="login" component={LoginContainer} />
    <Route path="people" component={PeopleContainer} />
    <IndexRoute component={SelectPollContainer}/>
    <Redirect path="*" to="/vote" />
  </Route>
);
