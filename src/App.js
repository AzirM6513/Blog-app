import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const loginObj = {
    handleLogin,
    username,
    password,
    setUsername,
    setPassword,
  };

  return (
    <div>
      {user === null ? (
        <LoginForm loginObj={loginObj} />
      ) : (
        <Blogs blogs={blogs} user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
