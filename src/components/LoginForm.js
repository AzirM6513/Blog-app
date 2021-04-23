import React, { useState } from 'react';
import Error from './Error';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  loginBtn: {
    marginTop: 0.8 + 'rem',
  },
});

const LoginForm = ({ login, errorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    login(username, password);

    setUsername('');
    setPassword('');
  };

  const classes = useStyles();

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' component='h2' gutterBottom>
        login to application
      </Typography>
      <Error message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type='submit' className={classes.loginBtn} color='primary'>
          login
        </Button>
      </form>
    </Container>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
