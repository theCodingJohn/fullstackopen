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

export default {
  dummy,
  totalLikes,
  favoriteBlog,
};
