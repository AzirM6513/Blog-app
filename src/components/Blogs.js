import React from 'react';

import Blog from './Blog';
import Notification from './Notification';

import Container from '@material-ui/core/Container';

const Blogs = ({ blogs, errorMessage, updateBlog, removeBlog }) => {
  return (
    <Container maxWidth='md'>
      <Notification message={errorMessage} />
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
    </Container>
  );
};

export default Blogs;
