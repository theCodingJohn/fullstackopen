import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, like } from "./reducers/blogReducer";
import { setUser, loginUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/usersReducer";

import blogService from "./services/blogs";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs.sort((a, b) => b.likes - a.likes));
  const user = useSelector(({ user }) => user);

  const [, setBlogs] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));

      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (e) {
      dispatch(setNotification("Wrong Credentials", "error", 3));
    }
  };

  const likeBlog = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id);
      const updatedBlog = { ...blog, likes: blog.likes += 1 };
      dispatch(like(id, updatedBlog, blog.user));
    } catch (e) {
      console.log(e);
    }
  };

  const blogList = blogs.map((blog) => <Blog user={user} key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} likeBlog={() => likeBlog(blog.id)}/>);

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const addBlog = async (newBlog) => {
    const savedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(savedBlog));

    dispatch(setNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} added`, "successful", 3));
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new">
        <BlogForm addBlog={addBlog} />
      </Togglable>
    );
  };

  const logoutUser = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const userPage = () => {
    return (
      <div>
        <div>
          <strong>{user.name}</strong> is logged in
          <button onClick={logoutUser}>logout</button>
        </div>
        <Users />
        <h2>create new</h2>
        {blogForm()}
        <br />
        {blogList}
      </div>
    );
  };

  return (
    <div>
      <h2>{!user ? "log in to application" : "blogs"}</h2>
      <Notification />
      {user === null ? loginForm() : userPage()}
    </div>
  );
};

export default App;
