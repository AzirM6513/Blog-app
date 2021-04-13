import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog /> renders properly', () => {
  test('component only renders title and author by default', () => {
    const blog = {
      title: 'Component testing with react-testing',
      author: 'Christian',
      likes: 0,
      url: 'component.test.react.dev',
    };

    const component = render(<Blog blog={blog} />);
    const header = component.container.querySelector('.blog-header');

    expect(header).toHaveTextContent(`${blog.title} ${blog.author}`);
  });
});
