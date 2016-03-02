import { NotifyLevels } from './constants';

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS } from './action-types.js';

export function addNotification(text, idNotification, level = NotifyLevels.INFO) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
      firebase.child(`notifications/${auth.id}`).once('value', notify => {
      if (notify.val() === null || notify.val().filter( msg => msg.id === idNotification && msg.text === text).length === 0) {
        const date = new Date;
        const newNotifications = {
          id: idNotification,
          text: text,
          level: level,
          created: date.toLocaleString(),
          pending: true,
          isNew: true
        };
        const notifications = notify.val() === null ? [newNotifications] : notify.val().concat(newNotifications);
        firebase.child(`notifications/${auth.id}`).set(notifications, error => {
          if (error) {
            console.error('ERROR @ addingNotification :', error);
            dispatch({
              type: ADD_NOTIFICATION
            });
          }
        });
      }
    });
  };
}

export function setNotificationAsReaded(index) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`notifications/${auth.id}`).once('value', notify => {
      const notifications = notify.val() !== null
          ? notify.val().map( (notification, ind) =>
             ind !== index ? notification : Object.assign({}, notification, notification.pending ? {pending: false} : {isNew: false}))
          : [];
      firebase.child(`notifications/${auth.id}`).set(notifications);
    });
  };
}

export function onRemoveNotificationClick(index) {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`notifications/${auth.id}/`).transaction( notify => notify.filter( (notication, newIndex) => index !== newIndex ), error => {      console.error('ERROR @ removingNotification :', error);
      dispatch({
        type: REMOVE_NOTIFICATION
      });
    });
  };
}

export function onRemoveAllNotificationsClick() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`notifications/${auth.id}/`).set([], error => {      console.error('ERROR @ removingNotification :', error);
      dispatch({
        type: REMOVE_ALL_NOTIFICATIONS
      });
    });
  };
}

