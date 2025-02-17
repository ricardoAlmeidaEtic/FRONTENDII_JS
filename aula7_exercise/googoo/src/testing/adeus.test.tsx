import Adeus from '../components/Adeus';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('Adeus', () => {
  render(<Adeus nome="Mundo" />);
  expect(screen.getByText('Olá Mundo!')).toBeInTheDocument();
});