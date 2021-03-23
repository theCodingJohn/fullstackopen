import React from "react";
import { useParams } from "react-router-dom";

const BlogDetails = ({ blogs }) => {
  const id = useParams().id;
  const blog = blogs.find(blog => blog.id === id);
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
