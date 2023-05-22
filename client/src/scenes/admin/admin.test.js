import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/system';
import React from 'react';
import Admin from './index';

jest.mock('../../../src/state/api', () => ({
  ...jest.requireActual('../../../src/state/api'),
  useGetAdminsQuery: jest.fn(),
}));

describe('Admin Component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders without crashing', () => {
    createRoot(container).render(
      <ThemeProvider theme={createTheme()}>
        <Admin />
      </ThemeProvider>
    );
  });
});
