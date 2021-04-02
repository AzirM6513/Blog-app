import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, user, handleLogout }) => {
  const blogsStyle = {
    display: 'inline',
  };

  return (
    <div>
      <h2>Blogs</h2>
      <p style={blogsStyle}>{user.name} logged-in</p>
      <button onClick={handleLogout}>logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
