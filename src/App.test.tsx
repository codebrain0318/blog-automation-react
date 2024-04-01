import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('render snapshot of app', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});