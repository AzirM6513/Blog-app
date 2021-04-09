import React, { useState } from 'react';
import userService from '../services/users';

const Blog = async ({ blog }) => {
  const [showDetails, setShowDetails] = useState(true);
  const { username } = await userService.findUserById(blog.user);

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
        <li>{username}</li>
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
