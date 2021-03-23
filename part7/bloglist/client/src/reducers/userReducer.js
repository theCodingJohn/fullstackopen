import loginService from "../services/login";
import blogService from "../services/blogs";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.data;
    case "SET_USER":
      return action.data;
    default:
      return state;
  }
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });

    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    blogService.setToken(user.token);

    dispatch({
      type: "LOGIN_USER",
      data: user,
    });
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_USER",
      data: user,
    });
  };
};

export default userReducer;
