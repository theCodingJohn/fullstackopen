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
  const initialBLogs = await helper.blogsInDB();

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

test("successfully creates a new blog post", async () => {
  const newBlog = {
    title: "awesome blog",
    author: "Albert Einstein",
    url: "bloggers.com/232145",
    likes: 39,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("a post request without a likes attribute will be saved in the DB with a default value of 0", async () => {
  const newBlog = {
    title: "oh la la la",
    author: "Icarus",
    url: "blogspot.com/54351232",
  };

  const savedBlog = await api.post("/api/blogs").send(newBlog);
  expect(savedBlog.body.likes).toBe(0);
});

test("a post request with no title and url attribute is a bad requests", async () => {
  const newBlog = {
    author: "Zeus",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
