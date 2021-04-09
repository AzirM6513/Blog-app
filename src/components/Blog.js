import React, { useState } from 'react';
import userService from '../services/users';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  let username = null;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (blog.hasOwnProperty('user')) {
    username = userService.getUserById(blog.user).username;
  }

  if (showDetails) {
    return (
      <ul className='margin-bottom slim-black-border ul-padding'>
        <li>
          {blog.title} {blog.author}
          <button className='margin-left' onClick={toggleDetails}>
            hide
          </button>
        </li>
        <li>{blog.url}</li>
        <li>
          likes {blog.likes}
          <button className='margin-left'>like</button>
        </li>
        <li>{username || blog.author}</li>
      </ul>
    );
  }

  return (
    <li>
      {blog.title} {blog.author}
      <button className='margin-left' onClick={toggleDetails}>
        show
      </button>
    </li>
  );
};

export default Blog;
