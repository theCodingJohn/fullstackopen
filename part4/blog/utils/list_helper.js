/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, value) => sum + value.likes;

  return blogs.reduce(reducer, 0);
};

export default {
  dummy,
  totalLikes,
};
