import React, { useState } from 'react';
import userService from '../services/users';

import { Card, Typography } from '@material-ui/core';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('view');

  const showWhenVisible = { display: showDetails ? '' : 'none' };

  let username = null;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setButtonLabel(showDetails ? 'view' : 'hide');
  };

  const addLike = () => {
    const newBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    };

    updateBlog(newBlog);
  };

  const deleteBlog = () => {
    if (window.confirm(`remove blog '${blog.title}' by ${blog.author}?`)) {
      removeBlog(blog);
    }
  };

  if (Object.keys(blog).includes('user')) {
    username = userService.getUserById(blog.user).username;
  }

  const Header = () => (
    <Typography>
      {blog.title} {blog.author}
    </Typography>
  );

  return (
    <Card className='margin-bottom slim-black-border padding blog'>
      <Header className='blog-header' />
      <button className='margin-left toggle-details' onClick={toggleDetails}>
        {buttonLabel}
      </button>
      <div style={showWhenVisible} className='togglableContent'>
        <li>{blog.url}</li>
        <li className='like-details'>
          likes {blog.likes}
          <button className='margin-left' onClick={addLike}>
            like
          </button>
        </li>
        <li>{username || blog.author}</li>
        <button
          className='del-btn margin-top slim-black-border'
          onClick={deleteBlog}
        >
          <strong>delete</strong>
        </button>
      </div>
    </Card>
  );
};

export default Blog;
