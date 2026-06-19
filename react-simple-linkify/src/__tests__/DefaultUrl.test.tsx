import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DefaultUrl from '../DefaultUrl';

describe('DefaultUrl', () => {
  it('renders a safe new-tab anchor with the url as href and text', () => {
    render(<DefaultUrl url="https://example.com" />);
    const link = screen.getByRole('link', { name: 'https://example.com' });

    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('forwards extra props such as className', () => {
    render(<DefaultUrl url="https://example.com" className="link" />);
    expect(screen.getByRole('link')).toHaveClass('link');
  });

  it('allows overriding target/rel via extra props', () => {
    render(<DefaultUrl url="https://example.com" target="_self" />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_self');
  });
});
