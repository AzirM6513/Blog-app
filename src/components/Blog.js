import React, { useState } from 'react';
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(true);

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
        <li>{blog.user}</li>
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
