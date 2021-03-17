import React, { useState } from 'react';
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  const likeBlog = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id);
      const updatedBlog = { ...blog, likes: blog.likes += 1 };
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <strong>{blog.author} </strong>
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br/> {blog.likes} <button onClick={() => likeBlog(blog.id)}>like</button> <br/> {blog.user.name}
      </div>
    </div>
  )
}


export default Blog