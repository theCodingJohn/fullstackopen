import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../reducers/blogReducer";

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const handleSubmit = (e) => {
    const comment = {
      comment: e.target.comment.value,
    };

    dispatch(addComment(id, comment));
    e.target.reset();
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url} rel="noreferrer noopener">{blog.url}</a>
      <div>
        {blog.likes} likes <button>like</button>
      </div>
      <div>
        added by {blog.name}
      </div>
      <h2>comments</h2>
      <form onSubmit={handleSubmit}>
        <input name="comment" type="text" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {
          blog.comments.map((comment, index) =>
            <li key={index}>
              {comment}
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default BlogDetails;
