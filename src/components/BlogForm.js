import { Grid } from '@material-ui/core';
import React, { useState } from 'react';

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
    <div id='form' className='hidden'>
      <h2 style={{ textAlign: 'center' }}>create new</h2>
      <Grid justify='center' container>
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
      </Grid>
    </div>
  );
};

export default BlogForm;
