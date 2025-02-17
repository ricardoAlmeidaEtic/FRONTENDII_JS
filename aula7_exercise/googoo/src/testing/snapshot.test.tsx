import ShowUser from '../components/ShowUser';
import { render } from '@testing-library/react';

test('Counter increments correctly', () => {
  const { container } = render(<ShowUser />);
  expect(container).toMatchSnapshot();
});