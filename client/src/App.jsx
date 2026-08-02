import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import CreateBlogForm from "./components/CreateBlogForm";
import blogService from "./services/blogs";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Blogs from "./components/blogs";
import Users from "./components/Users";
import User from './components/User'
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound.jsx";
import ErrorBoundary from "./errorBoundary.jsx";
import useUserStore from './userstore'
import { useErrorActions } from './store'
import { useBlogActions } from './blogstore'
import { useLoginActions } from './userstore'
import { useUser } from './userstore'
import { useErrorErrorMessage } from './store'
import { useBlogs } from './blogstore'
import { Container, AppBar, Toolbar, Button } from "@mui/material";

const App = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useErrorActions()
  const { login } = useLoginActions()
  const { logout } = useLoginActions()
  const user = useUser()
  const errorMessage = useErrorErrorMessage()
  const blogs = useBlogs()
  const { initializeBlogs, createTheBlog, blogRemove } = useBlogActions()

  const navigate = useNavigate();

  const createBlog = async (object) => {
    await createTheBlog(object);
    setSuccessMessage(`a new blog ${object.title} by ${object.author} added`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
    navigate("/");
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      useUserStore.setState({ user })
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    initializeBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login({ username, password });
      navigate("/");
      setUsername("");
      setPassword("");
    } catch {
      error()

    }
  };

  const handleLogout = () => {
    logout()
    navigate("/");
  };
  const handleBlogRemove = (blogId) => {
    blogRemove({ id: blogId })
    navigate("/");
  };
  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };
  return (
    <Container>
      <AppBar
        position="static"
        style={{
          fontSize: "30px",
          display: "flex",
          flexDirection: "row",
          paddingLeft: "15px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        BlogApp
        {user === null ? (
          <Toolbar>
            {" "}
            <Button color="inherit" component={Link} to="/" sx={style}>
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/login" sx={style}>
              login
            </Button>
          </Toolbar>
        ) : (
          <Toolbar>
            <Button color="inherit" component={Link} to="/" sx={style}>
              blogs
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/users"
              sx={style}
            >
              users
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/createnewblog"
              sx={style}
            >
              new blog
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/"
              onClick={handleLogout}
              sx={style}
            >
              logout
            </Button>
          </Toolbar>
        )}
      </AppBar>

      <Routes>
        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <Login
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                errorMessage={errorMessage}
              />
            </ErrorBoundary>
          }
        />
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Blogs blogs={blogs} message={successMessage} />
            </ErrorBoundary>
          }
        />
        <Route path="/users/:id"
          element={<ErrorBoundary>
            <User />
          </ErrorBoundary>
          } />
        <Route
          path="/users"
          element={
            <ErrorBoundary>
              <Users
              />
            </ErrorBoundary>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary>
              <Blog
                blogs={blogs}
                handleBlogRemove={handleBlogRemove}
                user={user}
              />
            </ErrorBoundary>
          }
        />
        <Route
          path="/createnewblog"
          element={
            <ErrorBoundary>
              <CreateBlogForm createBlog={createBlog} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/*"
          element={
            <ErrorBoundary>
              <PageNotFound />
            </ErrorBoundary>
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
