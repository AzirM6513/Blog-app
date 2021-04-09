import React, { useState } from 'react';
import userService from '../services/users';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('view');

  const showWhenVisible = { display: showDetails ? '' : 'none' };

  let username = null;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setButtonLabel(showDetails ? 'view' : 'hide');
  };

  if (blog.hasOwnProperty('user')) {
    username = userService.getUserById(blog.user).username;
  }

  return (
    <ul className='margin-bottom slim-black-border ul-padding'>
      <li>
        {blog.title} {blog.author}
        <button className='margin-left' onClick={toggleDetails}>
          {buttonLabel}
        </button>
      </li>
      <li style={showWhenVisible}>{blog.url}</li>
      <li style={showWhenVisible}>
        likes {blog.likes}
        <button className='margin-left' style={showWhenVisible}>
          like
        </button>
      </li>
      <li style={showWhenVisible}>{username || blog.author}</li>
    </ul>
  );
};

export default Blog;
