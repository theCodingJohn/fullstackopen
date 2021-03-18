import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  const mockHandler = jest.fn;
  const testBlog = {
    title: "Hello World: The Infamous Line",
    author: "Kent Dodds",
    url: "https://reactblogs.com/23124123",
    likes: 4,
    user: {
      username: "john",
      id: "605038f6c00b3103e8b441a6",
    },
  };
  const testBlogs = [
    {
      title: "Hello World: The Infamous Line",
      author: "Kent Dodds",
      likes: 4,
      url: "https://reactblogs.com/23124123",
      user: {
        username: "john",
        id: "605038f6c00b3103e8b441a6",
      },
    },
  ];
  const user = {
    name: "John",
    username: "john",
    id: "605038f6c00b3103e8b441a6",
  };

  beforeEach(() => {
    component = render(
      <Blog
        blog={testBlog}
        setBlogs={mockHandler}
        blogs={testBlogs}
        user={user}
      />
    );
  });

  test("renders the blog's title and author but neither the url and num of likes by default", () => {
    const div = component.container.querySelector(".blogHeader");

    expect(div).toHaveTextContent(testBlog.title);
    expect(div).toHaveTextContent(testBlog.author);
    expect(div).not.toHaveTextContent(testBlog.url);
    expect(div).not.toHaveTextContent(testBlog.likes);
  });

  test("blogs url and num of likes are shown when the show button has been clicked", () => {
    const showButton = component.container.querySelector("button");
    fireEvent.click(showButton);

    const div = component.container.querySelector(".blogBody");

    expect(div).toHaveTextContent(testBlog.url);
    expect(div).toHaveTextContent(testBlog.likes);
  });
});
