import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "state/index.js";

test("renders app with default theme", () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const dashboardElement = getByText(/dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});

test("renders app with dark theme", () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const toggleButton = getByText(/toggle theme/i);
  toggleButton.click();
  const dashboardElement = getByText(/dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});
