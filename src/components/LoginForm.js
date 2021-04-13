import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

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
    <div>
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
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
