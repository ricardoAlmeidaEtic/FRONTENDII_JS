import Counter from '../components/Counter';
import { render } from '@testing-library/react';

test('Counter increments correctly', () => {
  const { container } = render(<Counter />);
  expect(container).toMatchSnapshot();
});