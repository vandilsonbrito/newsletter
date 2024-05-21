import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../src/App';


describe('App', () => {
  it('renders the App component', () => {
    render(<App />)
    
    const h1 = screen.getByRole('heading', {level: 1});
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(/receba dicas/i)
  })
})