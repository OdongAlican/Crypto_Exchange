import { render, fireEvent } from '@testing-library/react';
import App from './App';

const setup = () => {
  const utils = render(<App />)
  const input = utils.getByLabelText('value-input')
  return { input, ...utils }
}

test('It should not allow letters to be inputted', () => {
  const {input} = setup()
  expect(input.value).toBe('1');
  fireEvent.change(input, {target: {value: 'Random String'}})
  expect(input.value).toBe('');
  fireEvent.change(input, {target: {value: 12}})
  expect(input.value).toBe("12");
});
