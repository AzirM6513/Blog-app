import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <h3 className='message success-message'>{message}</h3>;
};

export default Notification;
