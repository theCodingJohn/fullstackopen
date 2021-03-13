/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, value) => sum + value.likes;

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const highestLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favoriteBlog = blogs.find((blog) => blog.likes === highestLikes);
  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  const authors = [];

  const findAuthor = (toFindAuthor) =>
    authors.find((author) => author.author.toLowerCase() === toFindAuthor);

  blogs.forEach((blog) => {
    if (findAuthor(blog.author.toLowerCase()) === undefined) {
      const object = {
        author: blog.author,
        blogs: 1,
      };
      authors.push(object);
    } else {
      const updatedAuthors = authors.map((author) => {
        if (author.author.toLowerCase() === blog.author.toLowerCase()) {
          author.blogs += 1;
        }
      });
      authors.concat(updatedAuthors);
    }
  });

  const highestNumberOfBlogs = Math.max(
    ...authors.map((author) => author.blogs)
  );

  return authors.find((author) => author.blogs === highestNumberOfBlogs);
};

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
