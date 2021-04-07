import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, user, handleLogout }) => {
  return (
    <div>
      <h2>Blogs</h2>
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
