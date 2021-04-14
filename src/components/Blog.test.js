import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog /> renders properly', () => {
  let component;
  const blog = {
    title: 'Component testing with react-testing',
    author: 'Christian',
    likes: 10,
    url: 'component.test.react.dev',
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  test('component only renders title and author by default', () => {
    const header = component.container.querySelector('.blog-header');
    expect(header).toHaveTextContent(`${blog.title} ${blog.author}`);
  });
});

describe('<Blog /> toggles properly', () => {
  let component;
  const blog = {
    title: 'Component testing with react-testing',
    author: 'Christian',
    likes: 10,
    url: 'component.test.react.dev',
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  test('at start details are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, details are displayed', () => {
    const button = component.container.querySelector('.toggle-details');
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('.toggle-details');
    fireEvent.click(button);

    const closeButton = component.container.querySelector('.toggle-details');
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
