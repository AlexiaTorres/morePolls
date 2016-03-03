import { setFollowerUsers, clearFollowers, setFollowingUsers, clearFollowing, setWatchedPeople } from './actions';

export function registerListeners(id) {
  return (dispatch, getState) => {
  const { firebase } = getState();
  dispatch(setWatchedPeople([]));
  const followersRef = firebase.child(`followers/${id}/`);
  followersRef.on('value', snap => {
    const promises = Object.keys(snap.val() || []).map( userId => new Promise(
      resolve => firebase.child(`users/${userId}`).once('value', snapshot => resolve(snapshot.val()))
    ));
    Promise.all(promises).then(followers => dispatch(setFollowerUsers(followers)));
  });

  const followingRef = firebase.child(`following/${id}/`);
  followingRef.on('value', snap => {
    const promises = Object.keys(snap.val() || []).map( userId => new Promise(
      resolve => firebase.child(`users/${userId}`).once('value', snapshot => resolve(snapshot.val()))
    ));
    Promise.all(promises).then(following => dispatch(setFollowingUsers(following)));
  });
};
}

export function unregisterListeners(id) {
  return (dispatch, getState) => {
  const { firebase } = getState();
  const followersRef = firebase.child(`followers/${id}/`);
  const followingRef = firebase.child(`following/${id}/`);
  followersRef.off();
  followingRef.off();
  dispatch(clearFollowers());
  dispatch(clearFollowing());
};
}
