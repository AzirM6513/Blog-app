import React from 'react';

const Error = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <h3 className='message error-message'>{message}</h3>;
};

export default Error;
