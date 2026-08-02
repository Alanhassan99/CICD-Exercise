const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "theBlog",
    author: "theGuy",
    url: "thisURL",
    likes: 7,
  },
  {
    title: "theBlogG",
    author: "theGuyY",
    url: "thisURLL",
    likes: 9,
  },
];

const theReset = async () => {
  const users = await usersInDb();
  const theUser = users.find((user) => user.username === "Alan123");
  await Blog.deleteMany({});
  let blogObject = new Blog({ ...initialBlogs[0], user: theUser.id });
  await blogObject.save();
  blogObject = new Blog({ ...initialBlogs[1], user: theUser.id });
  await blogObject.save();
};

const nonExistingId = async () => {
  const blog = new Blog({ title: "tS" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  theReset,
};
