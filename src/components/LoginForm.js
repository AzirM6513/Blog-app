import React, { useState } from 'react';

import Togglable from './Togglable';
import Error from './Error';

const LoginForm = ({ login, errorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    login(username, password);

    setUsername('');
    setPassword('');
  };

  return (
    <Togglable buttonLabel='login'>
      <h2>login to application</h2>
      <Error message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            className='login'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            className='login'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </Togglable>
  );
};

export default LoginForm;
