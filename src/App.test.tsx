import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'
import { mockMatchMedia } from './setupTests';

beforeAll(() => {
  mockMatchMedia();
});

test('renders learn react link', () => {
  render(<App />);
});
