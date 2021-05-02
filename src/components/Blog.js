import React, { useState } from 'react';
import userService from '../services/users';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
  commentHeader: {
    marginTop: 0.6 + 'rem',
    marginBottom: 0.3 + 'rem',
  },
  comments: {
    marginBottom: 0.6 + 'rem',
  },
  comment: {
    listStyle: 'disc',
  },
});

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [newComment, setNewComment] = useState('');
  const showWhenVisible = { display: showDetails ? '' : 'none' };

  let username = null;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const addLike = () => {
    const newBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      dislikes: blog.dislikes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
      comments: blog.comments,
    };

    updateBlog(newBlog);
  };

  const addDislike = () => {
    const newBlog = {
      user: blog.user,
      likes: blog.likes,
      dislikes: blog.dislikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
      comments: blog.comments,
    };

    updateBlog(newBlog);
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
          <ThumbDownAltOutlined fontSize='small' />
          {blog.dislikes}
        </Button>
      </CardActions>
    </>
  );

  const addComment = (e) => {
    e.preventDefault();
    const blogObject = {
      user: blog.user,
      likes: blog.likes,
      dislikes: blog.dislikes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
      comments: blog.comments.concat(newComment),
    };

    updateBlog(blogObject);
    setNewComment('');
  };

  const CommentSection = () => (
    <div style={showWhenVisible}>
      <Typography variant='h6' className={classes.commentHeader}>
        Comments
      </Typography>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i} className={classes.comment}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
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
        <CommentSection />
        <form onSubmit={addComment} style={showWhenVisible}>
          <TextField
            className={classes.comments}
            label='New Comment'
            type='text'
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
          ></TextField>
        </form>
        <Info />
      </CardContent>
    </Card>
  );
};

export default Blog;
