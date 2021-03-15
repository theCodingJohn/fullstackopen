import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import helper from "./test_helper.js";

import Blog from "../modules/blog.module.js";

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

const api = supertest(app);

test("the amount of blogs returned is correct", async () => {
  const initialBLogs = await helper.notesInDB();

  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(initialBLogs.length);
});

test("the unique identifier of blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
