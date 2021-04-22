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
    <Typography variant='body1' component='p'>
      {blog.title} {blog.author}
    </Typography>
  );

  const Votes = () => (
    <Typography>
      <Typography variant='body2' component='p'>
        likes {blog.likes}
      </Typography>
      <button onClick={addLike}>like</button>
    </Typography>
  );

  return (
    <Card>
      <Header component='h2' />
      <button onClick={toggleDetails}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        <li>{blog.url}</li>
        <Votes />
        <li>{username || blog.author}</li>
        <button onClick={deleteBlog}>
          <strong>delete</strong>
        </button>
      </div>
    </Card>
  );
};

export default Blog;
