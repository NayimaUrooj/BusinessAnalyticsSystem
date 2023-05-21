
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/system';
import { mount } from 'enzyme';
import React from 'react';
import { useGetAdminsQuery } from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import Admin from './index';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('state/api', () => ({
  useGetAdminsQuery: jest.fn(),
}));

describe('Admin Component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  afterEach(() => {
    container.remove();
    container = null;
  });

  it('renders without crashing', () => {
    createRoot(container).render(
      <ThemeProvider theme={{}}>
        <Admin />
      </ThemeProvider>
    );
  });
});
