import React from 'react';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Notification from './Notification';

const Blogs = ({ blogs, user, handleLogout, errorMessage, addBlog }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <p className='username-p'>{user.name} logged-in</p>
      <button onClick={handleLogout}>logout</button>
      <BlogForm createBlog={addBlog} />
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
