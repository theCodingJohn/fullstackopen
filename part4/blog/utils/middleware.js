import jwt from "jsonwebtoken";

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
    return next();
  }
  req.token = null;
  return next();
};

const userExtractor = (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  req.decodedToken = decodedToken;
  next();
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: error.message });
  }
  next(error);
};

export default {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
