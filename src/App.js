import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

import blogService from './services/blogs';
import loginService from './services/login';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BlogForm from './components/BlogForm';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
    } catch (exception) {
      setErrorMessage('Wrong Username or Password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);

    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const addBlog = async (blog) => {
    if (blog.author === '') {
      blog.author = user.name;
    }

    const returnedBlog = await blogService.create(blog);
    setBlogs(blogs.concat(returnedBlog));

    setErrorMessage(
      `a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`
    );
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const updateBlog = async (blog) => {
    const returnedBlog = await blogService.update(blog);
    setBlogs(blogs.filter((post) => post.id !== blog.id).concat(returnedBlog));
  };

  const removeBlog = async (blog) => {
    try {
      console.log(blog.id);
      await blogService.deleteById(blog.id);
      setBlogs(blogs.filter((post) => post.id !== blog.id));

      setErrorMessage(`blog '${blog.title}' was removed`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      // fix me: correctly display red or green if failed or success

      setErrorMessage(`failed to delete blog '${blog.title}'`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const toggleForm = () => {
    if (visible) {
      document.getElementById('form').classList.add('hidden');
      setVisible(false);
      return;
    }

    document.getElementById('form').classList.remove('hidden');
    setVisible(true);
  };

  return (
    <div>
      {user === null ? (
        <div>
          <LoginForm login={handleLogin} errorMessage={errorMessage} />
        </div>
      ) : (
        <div>
          <AppBar position='static'>
            <Toolbar className='navbar navbar-expand-sm'>
              <Typography variant='h6'>Blog App</Typography>
              <IconButton
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                className='navbar-toggler'
              >
                <MenuIcon style={{ color: 'white' }}></MenuIcon>
              </IconButton>
              <div
                className='collapse navbar-collapse nav-container'
                id='navbarNav'
              >
                <ul className='navbar-nav'>
                  <li className='nav-item active'>
                    <Button className='nav-link' color='inherit'>
                      home
                    </Button>
                  </li>
                  <li className='nav-item'>
                    <Button
                      className='nav-link'
                      color='inherit'
                      onClick={toggleForm}
                    >
                      create
                    </Button>
                  </li>
                  <li className='nav-item'>
                    <Button className='nav-link' color='inherit'>
                      users
                    </Button>
                  </li>
                  <li className='nav-item'>
                    <Button
                      className='nav-link'
                      color='inherit'
                      onClick={handleLogout}
                    >
                      logout
                    </Button>
                  </li>
                </ul>
              </div>
            </Toolbar>
          </AppBar>
          <BlogForm createBlog={addBlog} />
          <Blogs
            blogs={blogs.sort(
              (a, b) => b.likes - b.dislikes - (a.likes - a.dislikes)
            )}
            user={user}
            handleLogout={handleLogout}
            errorMessage={errorMessage}
            addBlog={addBlog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        </div>
      )}
    </div>
  );
};

export default App;
