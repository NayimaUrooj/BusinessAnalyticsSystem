import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './state';
import { api } from './state/api';
test('store configuration', () => {
  const store = configureStore({
    reducer: {
      global: globalReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });

  expect(store).toBeDefined();
  expect(store.getState().global.mode).toBe('dark');
});
