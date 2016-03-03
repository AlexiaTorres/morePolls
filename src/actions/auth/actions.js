import { pushState } from 'redux-router';
import { SET_NOTIFICATIONS, ALERT, INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, USER_EXISTS, WRONG_PASSWORD } from './action-types.js';
import { tokens } from '../../utils/tokens';
import * as settingsActions from '../settings';
import FirebaseTokenGenerator from "firebase-token-generator";

const appSecret = 'sRhN4rw1LfRCN8BXS5zCNpo3odJAWhTvLXXT8edk';
const tokenGenerator = new FirebaseTokenGenerator(appSecret);

function setUserSettings(firebase, dispatch, authData, nextActionType) {
  firebase.child(`users/${authData.uid}`).once('value', snapshot => {
    dispatch({
      type: nextActionType,
      payload: Object.assign({}, authData, {settings: snapshot.val()}),
      meta: {
        timestamp: Date.now()
      }
    });
    dispatch(settingsActions.registerListeners());
  });
}

export function createUser(user, password){
    return (dispatch, getState) => {
      const { firebase } = getState();
      const ref = firebase.child(`users/${user}`);
    ref.once('value', snap => {
      if (snap.exists()){
        dispatch({
          type: USER_EXISTS,
          payload: "This user already exists",
      });
      } else {
        ref.set({ user, password});
        dispatch(logIn(user, password));
       }
     });
  };
}

export function logIn(user, password){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child(`users/${user}`);
    ref.once('value', snap => {
      if (snap.exists()  &&   snap.val().password === password){
        const token = tokenGenerator.createToken({ uid: user, provider: "custom" }, { expires: 9999999999999 });
        firebase.authWithCustomToken(token, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Login Succeeded!", authData);
            dispatch({
              type: INIT_AUTH,
              payload: firebase.getAuth(),
              meta: {
                timestamp: Date.now()
              }
            });
            dispatch(pushState(null, '/poll'));
           }
         });
      } else {
        dispatch({
          type: WRONG_PASSWORD,
          payload: "Wrong username or password",
        });
      }
    });
  };
}

export function authenticate(user) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    dispatch(pushState(null, '/'));

    firebase.authWithCustomToken(tokens[user], (error, authData) => {
      if (error) {
        console.error('ERROR @ authWithCustomToken :', error); // eslint-disable-line no-console
      }
      else {
        setUserSettings(firebase, dispatch, authData, SIGN_IN_SUCCESS);
      }
        firebase.child(`notifications/${auth.id}`).once('value', snapshot => {
          dispatch({
            type: SET_NOTIFICATIONS,
            notifications: snapshot.val() !== null ? snapshot.val() : []          });
        });
    });
  };
}

export function initAuth() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const authData = firebase.getAuth();
    if (authData && authData.uid) {
      setUserSettings(firebase, dispatch, authData, INIT_AUTH);
    }
  };
}

export function signOut() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.unauth();
    dispatch(pushState(null, '/'));
    dispatch({
      type: SIGN_OUT_SUCCESS
    });
    dispatch(settingsActions.unregisterListeners());
    dispatch({
      type: SET_NOTIFICATIONS,
      notifications: []
    });
  };
}


export function cancelSignIn() {
  return dispatch => {
    return dispatch(pushState(null, '/'));
  };
}

export function registerError(){
  return (dispatch) => {
    dispatch({
      type: ALERT
    });
  };
}
