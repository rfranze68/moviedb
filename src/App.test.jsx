import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './App';

test('App - Render ALL components', () => {
  // Render ALL
  render(<Header />)
  render(<MoviesDetails />)
  render(<Movies />)
  render(<SeriesDetails />)
  render(<Series/>)
  render(<PersonsDetails />)
  render(<Persons />)
  render(<All />)

  // Events and assertions...
});

/*
import App from 'App';

test('App', () => {
  expect(true).toBeTruthy();
});
*/