import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);

      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('Wrong credentials');
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);

    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author || user.name,
      url: url,
    };

    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));

    setAuthor('');
    setTitle('');
    setUrl('');
  };

  const loginObj = {
    handleLogin,
    username,
    password,
    setUsername,
    setPassword,
  };

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <p className='blog-form-label'>title:</p>
          <input type='text' value={title} onChange={handleTitleChange} />
        </div>

        <div>
          <p className='blog-form-label'>author:</p>
          <input type='text' value={author} onChange={handleAuthorChange} />
        </div>

        <div>
          <p className='blog-form-label'>url:</p>
          <input type='text' value={url} onChange={handleUrlChange} />
        </div>

        <button type='submit'>create</button>
      </form>
    </div>
  );

  return (
    <div>
      {user === null ? (
        <LoginForm loginObj={loginObj} />
      ) : (
        <div>
          <Blogs blogs={blogs} user={user} handleLogout={handleLogout} />
          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
