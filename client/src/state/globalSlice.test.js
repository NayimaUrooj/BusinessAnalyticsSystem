import globalReducer, { setMode } from './index';

describe('global reducer', () => {
  it('should toggle mode when setMode is called', () => {
    const initialState = {
      mode: 'light',
    };
    const nextState = {
      mode: 'dark',
    };
    const action = setMode();
    const result = globalReducer(initialState, action);
    expect(result).toEqual(nextState);
  });
});
