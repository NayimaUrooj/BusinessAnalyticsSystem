import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from "../../App";
import { themeSettings } from "../../theme";

describe('Navigation', () => {
    test('renders app component', () => {
        render(
          <BrowserRouter>
            <App />
          </BrowserRouter>
        );
    // Assert that Geography component is rendered
    expect(screen.getByTestId('geography-component')).toBeInTheDocument();
  });
});
