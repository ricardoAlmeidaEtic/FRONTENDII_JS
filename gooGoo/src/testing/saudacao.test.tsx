import Saudacao from '../components/Saudacao';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('Saudacao', () => {
  render(<Saudacao nome="Mundo" />);
  expect(screen.getByText('Olá Mundo!')).toBeInTheDocument();
});