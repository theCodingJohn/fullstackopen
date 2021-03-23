const initialState = {
  message: null,
  type: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIF":
      return action.data;
    case "HIDE_NOTIF":
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, type, duration) => {
  return async (dispatch) => {
    if (window.timer) {
      clearTimeout(window.timer);
    }

    dispatch({
      type: "SHOW_NOTIF",
      data: {
        message,
        type,
      },
    });

    window.timer = setTimeout(() => {
      dispatch(hideNotif());
    }, duration * 1000);
  };
};

const hideNotif = () => {
  return {
    type: "HIDE_NOTIF",
  };
};

export default notificationReducer;
