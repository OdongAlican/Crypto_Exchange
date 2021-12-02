import { render, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

const setup = () => {
  const utils = render(<App />)
  const input = utils.getByLabelText('value-input')
  return { input, ...utils }
}

it('It should not allow letters to be inputted', () => {
  const {input} = setup();
  expect(input.value).toBe('1');
  fireEvent.change(input, {target: {value: 'Random String'}})
  expect(input.value).toBe('');
  fireEvent.change(input, {target: {value: 12}})
  expect(input.value).toBe("12");
});

it('It renders App component correctly', () => {
  const { getAllByTestId } = render(<App />);
  const result = getAllByTestId('appCoin');
  expect(result[0]).toHaveClass('App');
  expect(result[0]).toHaveTextContent('Bitcoin');
  expect(result[0]).not.toHaveTextContent('Radom Crypto');
})

it('matches App snapshot', () => {
  const appointment = renderer.create(<App />);
  const tree = appointment.toJSON();
  expect(tree).toMatchSnapshot();
});
