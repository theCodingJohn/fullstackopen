import React, { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          id="title"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
          type="text"
          name="title"
        />
      </div>
      <div>
        author:
        <input
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
          value={author}
          type="text"
          name="author"
        />
      </div>
      <div>
        url:
        <input
          id="url"
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

export default BlogForm;
