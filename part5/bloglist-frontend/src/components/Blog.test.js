import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  const mockHandler = jest.fn;
  const testBlog = {
    title: "Hello World: The Infamous Line",
    author: "Kent Dodds",
    url: "htpps://reactblogs.com/23124123",
    user: {
      username: "john",
      id: "605038f6c00b3103e8b441a6",
    },
  };
  const testBlogs = [
    {
      title: "Hello World: The Infamous Line",
      author: "Kent Dodds",
      url: "htpps://reactblogs.com/23124123",
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
});
