import { Grid, TextField, Button } from '@material-ui/core';
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
      <h2 style={{ textAlign: 'center' }}>Create New</h2>
      <Grid justify='center' container>
        <form onSubmit={addBlog}>
          <div>
            <TextField
              label='Title'
              type='text'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div>
            <TextField
              label='Author'
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div>
            <TextField
              label='Url'
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>

          <Button type='submit' color='primary'>
            create
          </Button>
        </form>
      </Grid>
    </div>
  );
};

export default BlogForm;
