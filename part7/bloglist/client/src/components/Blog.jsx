import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteABlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog, blogs, user, likeBlog }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  const deleteBlog = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id);
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(deleteABlog(id));
      }
    } catch (e)  {
      console.log(e);
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="blogHeader">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <strong>{blog.author} </strong>
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      <div className="blogBody" style={showWhenVisible}>
        {blog.url} <br/> <span className="like-value">{blog.likes}</span> <button className="likeButton" onClick={likeBlog}>like</button> <br/> {blog.user.name} <br /> {user.username === blog.user.username && <button onClick={() => deleteBlog(blog.id)}>remove</button>}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default Blog;