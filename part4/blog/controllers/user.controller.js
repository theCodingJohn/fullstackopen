import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user.model.js";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

usersRouter.post("/", async (req, res) => {
  const body = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

export default usersRouter;
