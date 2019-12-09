import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Weather from './app_components/weather.component';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("maxTemp exists", () => {
  const { getByTestId } = render(
    <Weather maxTemp="30"/>
  );
  expect(getByTestId(/maxTemp/i).textContent).toBe("30");
});


test("maxTemp exists", () => {
  const { queryByTestId } = render(
    <Weather maxTemp="30" />
  );
  expect(queryByTestId(/maxTemp/i)).toBeTruthy();
});

test("maxTemp doesn't exist", () => {
  const { queryByTestId } = render(
    <Weather
    maxTemp="30"
    />
  );
  expect(queryByTestId(/maxTemp/i)).toBeNull();
});