import React from 'react';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Notification from './Notification';

import { Card, Typography } from '@material-ui/core';

const Blogs = ({
  blogs,
  user,
  handleLogout,
  errorMessage,
  addBlog,
  updateBlog,
  removeBlog,
}) => {
  const Header = () => <Typography variant='h2'>Blgos</Typography>;

  return (
    <Card>
      <Header />
      <Notification message={errorMessage} />
      <p className='username-p'>{user.name} logged-in</p>
      <button onClick={handleLogout}>logout</button>
      <BlogForm createBlog={addBlog} />
      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Blogs;
