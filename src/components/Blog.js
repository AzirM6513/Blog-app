import React, { useState } from 'react';
import userService from '../services/users';

import {
  Card,
  CardContent,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { ThumbUpAltOutlined, ThumbDownAltOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: 0.8 + 'rem',
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

  const Header = () => (
    <Typography variant='body1' onClick={toggleDetails}>
      {blog.title} {blog.author}
    </Typography>
  );

  const Votes = () => (
    <div>
      <Typography variant='body2' component='h3'>
        likes {blog.likes}
      </Typography>
      <Button onClick={addLike}>
        <ThumbUpAltOutlined fontSize='small' />
      </Button>

      <Button onClick={addDislike}>
        <ThumbDownAltOutlined fontSize='small' />
      </Button>
    </div>
  );

  const classes = useStyles();

  return (
    <Card className={classes.gutterBottom} raised>
      <CardContent>
        <Header />
        <div style={showWhenVisible}>
          <li>{blog.url}</li>
          <Votes />
          <li>{username || blog.author}</li>
          <button onClick={deleteBlog}>
            <strong>delete</strong>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Blog;
