const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW_NOTIF":
      return action.data.notification;
    case "HIDE_NOTIF":
      return action.data.notification;
    default:
      return state;
  }
};

export const showNotification = (notification, duration) => {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_NOTIF",
      data: {
        notification,
      },
    });

    setTimeout(() => {
      dispatch(hideNotification());
    }, duration * 1000);
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIF",
    data: {
      notification: null,
    },
  };
};

export default notificationReducer;
