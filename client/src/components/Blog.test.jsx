import React from "react";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const testHelper = (user, blog) => {
  const blogArray = [blog];
  return (
    <MemoryRouter initialEntries={["/blogs/1"]}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={<Blog blogs={blogArray} user={user} />}
        />
      </Routes>
    </MemoryRouter>
  );
};

describe("testing the component", () => {
  test("everything is seen by non-users except remove and like buttons", () => {
    const blog = {
      title: "Whatsup",
      author: "theMan",
      url: "www.jfosdjfs.com",
      likes: 7,
      id: "1",
      user: {
        username: "Fred",
        password: "ric",
      },
    };

    const { container } = render(testHelper(null, blog));
    const likeButton = screen.queryByText("like");
    const removeButton = screen.queryByText("remove");
    const Added = screen.queryByText(/Added/);
    expect(Added).toBeInTheDocument();
    expect(likeButton).toBeNull();
    expect(removeButton).toBeNull();
  });

  test("everything is seen by user but not writer of blog except remove button", () => {
    const blog = {
      title: "Whatsup",
      author: "theMan",
      url: "www.jfosdjfs.com",
      likes: 7,
      id: "1",
      user: {
        username: "Fred",
        password: "ric",
      },
    };
    const theUser = {
      username: "Fredric",
      password: "the",
    };

    const { container } = render(testHelper(theUser, blog));
    const likeButton = screen.queryByText("like");
    const removeButton = screen.queryByText("remove");
    const Added = screen.queryByText(/Added/);
    expect(Added).toBeInTheDocument();
    expect(likeButton).toBeInTheDocument();
    expect(removeButton).toBeNull();
  });

  test("everything is seen by user that wrote the blog", () => {
    const blog = {
      title: "Whatsup",
      author: "theMan",
      url: "www.jfosdjfs.com",
      likes: 7,
      id: "1",
      user: {
        username: "Fred",
        password: "ric",
      },
    };
    const theUser = blog.user;

    const { container } = render(testHelper(theUser, blog));
    const likeButton = screen.queryByText("like");
    const removeButton = screen.queryByText("remove");
    const Added = screen.queryByText(/Added/);
    expect(Added).toBeInTheDocument();
    expect(likeButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });
});
