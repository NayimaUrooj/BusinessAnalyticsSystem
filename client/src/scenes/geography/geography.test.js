import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '../../state';
import { api } from '../../state/api';
import Geography from './index';
import '@testing-library/jest-dom/extend-expect';

jest.mock('client/src/assets/profile.jpeg', () => ({
  default: 'test-profile-image',
}));

describe('Navigation', () => {
  test('renders Geography component', () => {
    const store = configureStore({
      reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefault) => getDefault().concat(api.middleware),
    });

    render(
      <Provider store={store}>
        <Geography />
      </Provider>
    );

    const geographyComponent = screen.getByTestId('geography-component');
    expect(geographyComponent).toBeInTheDocument();
  });
});
