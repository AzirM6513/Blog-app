import React, { useState } from 'react';
import Togglable from './Togglable';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    createBlog(blogObject);

    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <Togglable buttonLabel='create new blog'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <p className='blog-form-label'>title:</p>
          <input
            id='title-input'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <p className='blog-form-label'>author:</p>
          <input
            id='author-input'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <p className='blog-form-label'>url:</p>
          <input
            id='url-input'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type='submit' id='submit-blog-btn'>
          create
        </button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
