import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShowUser from '../pages/ShowUser';

test('Counter increments correctly', () => {
  render(<ShowUser />);
  
  const button = screen.getByRole('button', { name: 'Ricardo' });
  fireEvent.click(button);

  expect(screen.getByText('Ricardo: 1 anos!')).toBeInTheDocument();
});