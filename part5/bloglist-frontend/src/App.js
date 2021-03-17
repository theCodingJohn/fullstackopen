import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setNotifMessage(`Wrong Credentials`);
      setNotifType("error");
      setTimeout(() => setNotifMessage(null), 3000);
    }
  };

  const blogList = blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
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

  const addBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };

    const savedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(savedBlog));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            onChange={({ target }) => setTitle(target.value)}
            value={title}
            type="text"
            name="title"
          />
        </div>
        <div>
          author:
          <input
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
            type="text"
            name="author"
          />
        </div>
        <div>
          url:
          <input
            onChange={({ target }) => setUrl(target.value)}
            value={url}
            type="text"
            name="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
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
        <h2>create new</h2>
        {blogForm()}
        <br />
        {blogList}
      </div>
    );
  };

  return (
    <div>
      <h2>{!!user ? "blogs" : "log in to application"}</h2>
      <Notification message={notifMessage} type={notifType} />
      {user === null ? loginForm() : userPage()}
    </div>
  );
};

export default App;
