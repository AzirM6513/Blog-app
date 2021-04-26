import React, { useState } from 'react';
import userService from '../services/users';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

import ThumbDownAltOutlined from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

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
  deleteBtn: {
    marginTop: 0.6 + 'rem',
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
      <Typography variant='h5' onClick={toggleDetails} className='blog-title'>
        {blog.title}
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

  const Info = () => (
    <div style={showWhenVisible} className={classes.content}>
      <Typography variant='body1'>
        <a href={blog.url} className={(classes.marginBottom, classes.links)}>
          read more
        </a>
      </Typography>
      <Typography variant='body1' color='textPrimary'>
        Posted by {blog.author || username}
      </Typography>
      <Button
        onClick={deleteBlog}
        color='secondary'
        variant='contained'
        className={classes.deleteBtn}
      >
        delete
      </Button>
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
