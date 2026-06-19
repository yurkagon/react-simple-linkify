import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { isValidElement } from 'react';
import { linkify } from '../linkifyText';
import type { UrlComponentProps } from '../types';

describe('linkify', () => {
  it('renders URLs as anchors and keeps surrounding text', () => {
    render(<>{linkify('go to https://example.com now')}</>);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
    expect(screen.getByText(/go to/)).toBeInTheDocument();
    expect(screen.getByText(/now/)).toBeInTheDocument();
  });

  it('uses a custom component for URLs', () => {
    const Custom = ({ url }: UrlComponentProps) => (
      <span data-testid="custom">{url}</span>
    );
    render(<>{linkify('see https://example.com', Custom)}</>);

    expect(screen.getByTestId('custom')).toHaveTextContent(
      'https://example.com',
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('produces stable, unique keys for every element', () => {
    const elements = linkify('a https://a.com b https://b.com');
    const keys = elements.map((el) => isValidElement(el) && el.key);

    expect(keys).toEqual(['text-0', 'url-1', 'text-2', 'url-3']);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
