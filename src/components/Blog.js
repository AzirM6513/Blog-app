import React, { useState } from 'react';
import userService from '../services/users';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(true);
  let username = null;

  if (blog.hasOwnProperty('user')) {
    username = userService.getUserById(blog.user).username;
  }

  if (showDetails) {
    return (
      <ul className='margin-bottom slim-black-border ul-padding'>
        <li>
          {blog.title} {blog.author}
        </li>
        <li>{blog.url}</li>
        <li>
          likes {blog.likes}
          <button>like</button>
        </li>
        <li>{username || blog.author}</li>
      </ul>
    );
  }

  return (
    <li>
      {blog.title} {blog.author}
    </li>
  );
};

export default Blog;
