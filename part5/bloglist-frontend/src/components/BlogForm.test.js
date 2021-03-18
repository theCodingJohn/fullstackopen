import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(<BlogForm addBlog={mockHandler} />);
  });

  test("hat the form calls the event handler it received as props with the right details when a new blog is created", () => {
    const form = component.container.querySelector("form");
    const title = component.container.querySelector("#title");
    const url = component.container.querySelector("#url");
    const author = component.container.querySelector("#author");

    fireEvent.change(title, {
      target: {
        value: "The Dreamer",
      },
    });
    fireEvent.change(url, {
      target: {
        value: "https://reactblog/41234",
      },
    });
    fireEvent.change(author, {
      target: {
        value: "Charlie Fact",
      },
    });

    fireEvent.submit(form);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe("The Dreamer");
    expect(mockHandler.mock.calls[0][0].url).toBe("https://reactblog/41234");
    expect(mockHandler.mock.calls[0][0].author).toBe("Charlie Fact");
  });
});
