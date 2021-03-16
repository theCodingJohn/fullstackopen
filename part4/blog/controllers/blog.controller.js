import jwt from "jsonwebtoken";
import express from "express";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedNote = await blog.save();
  user.blogs = user.blogs.concat(savedNote);
  await user.save();

  response.json(savedNote);
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedNote = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.json(updatedNote);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(id);
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } else {
    response.status(401).send({ error: "Unauthorized action" });
  }
});

export default blogsRouter;
