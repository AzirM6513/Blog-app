import React, { useState } from 'react';
import userService from '../services/users';

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { ThumbUpAltOutlined, ThumbDownAltOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: 0.8 + 'rem',
  },
  content: {
    marginTop: 1.2 + 'rem',
    MarginBottom: 1.2 + 'rem',
  },
  links: {
    textDecoration: 'none',
    color: '#636363',
    '&:hover': {
      color: 'black',
    },
  },
  smallMarginBottom: {
    marginBottom: 0.2 + 'rem',
  },
});

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const showWhenVisible = { display: showDetails ? '' : 'none' };

  let username = null;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const addLike = () => {
    const newBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    };

    updateBlog(newBlog);
  };

  const addDislike = () => {
    console.log('i feel like this button hasnt been implemented yet');
  };

  const deleteBlog = () => {
    if (window.confirm(`remove blog '${blog.title}' by ${blog.author}?`)) {
      removeBlog(blog);
    }
  };

  if (Object.keys(blog).includes('user')) {
    username = userService.getUserById(blog.user).username;
  }

  const Head = () => (
    <>
      <Typography variant='h5' onClick={toggleDetails}>
        {blog.title} {blog.author}
      </Typography>

      <CardActions>
        <Button size='small' onClick={addLike} color='primary'>
          <ThumbUpAltOutlined fontSize='small' />
          {blog.likes}
        </Button>

        <Button size='small' onClick={addDislike} color='secondary'>
          <ThumbDownAltOutlined fontSize='small' />0
        </Button>
      </CardActions>
    </>
  );

  const Votes = () => (
    <div>
      <Typography variant='body2' component='h3'>
        likes {blog.likes}
      </Typography>
    </div>
  );

  const Info = () => (
    <div style={showWhenVisible} className={classes.content}>
      <Typography variant='body1'>
        <a href={blog.url} className={(classes.marginBottom, classes.links)}>
          read more
        </a>
      </Typography>
      <Votes />
      <li>{username || blog.author}</li>
      <button onClick={deleteBlog}>
        <strong>delete</strong>
      </button>
    </div>
  );

  const classes = useStyles();

  return (
    <Card className={classes.gutterBottom} raised>
      <CardContent>
        <Head />
        <Info />
      </CardContent>
    </Card>
  );
};

export default Blog;
