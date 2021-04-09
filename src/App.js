import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

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

  return (
    <div>
      {user === null ? (
        <div>
          <LoginForm login={handleLogin} errorMessage={errorMessage} />
        </div>
      ) : (
        <div>
          <Blogs
            blogs={blogs}
            user={user}
            handleLogout={handleLogout}
            errorMessage={errorMessage}
          />
          <BlogForm createBlog={addBlog} />
        </div>
      )}
    </div>
  );
};

export default App;
