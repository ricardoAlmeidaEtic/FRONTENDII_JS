import Counter from '../components/Counter';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('Counter increments correctly', () => {
  render(<Counter />);
  
  const button = screen.getByRole('button', { name: 'Ricardo' });
  fireEvent.click(button);

  expect(screen.getByText('Ricardo: 1 anos!')).toBeInTheDocument();
});