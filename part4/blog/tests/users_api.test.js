import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import helper from "./test_helper.js";

import User from "../models/user.model.js";

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

const api = supertest(app);

describe("when there is initial some users saved", () => {
  test("users are returned as JSON", async () => {
    const usersAtStart = await helper.usersInDB();

    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(usersAtStart.length);
  });
});

describe("addition of a user", () => {
  test("succeeds with valid data", async () => {
    const newUser = {
      username: "mattbellamy",
      password: "thisisthepwoperway",
      name: "Matthew Bellamy",
      blogs: [],
    };

    await api.post("/api/users").send(newUser).expect(200);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("fails with status code 400 if data is invalid", async () => {
    const newUser = {
      username: "suckerpunch123",
      name: "Matthew Bellamy",
      blogs: [],
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
