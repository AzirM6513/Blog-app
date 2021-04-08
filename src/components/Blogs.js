import React from 'react';
import Blog from './Blog';
import Notification from './Notification';

const Blogs = ({ blogs, user, handleLogout, errorMessage }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <p className='username-p'>{user.name} logged-in</p>
      <button onClick={handleLogout}>logout</button>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
