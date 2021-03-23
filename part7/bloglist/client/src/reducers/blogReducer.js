import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "LIKE_BLOG":
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    case "ADD_COMMENT":
      return state.map((blog) => {
        blog.id !== action.data.id ? blog : action.data;
      });
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const like = (id, updatedBlog, blogUser) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(id, updatedBlog);
    returnedBlog.user = blogUser;
    dispatch({
      type: "LIKE_BLOG",
      data: returnedBlog,
    });
  };
};

export const deleteABlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteItem(id);

    dispatch({
      type: "DELETE_BLOG",
      data: {
        id,
      },
    });
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.addComment(id, comment);
    console.log(returnedBlog);

    dispatch({
      type: "ADD_COMMENT",
      data: returnedBlog,
    });
  };
};

export default blogReducer;
