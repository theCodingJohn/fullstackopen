const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

export default {
  errorHandler,
};
