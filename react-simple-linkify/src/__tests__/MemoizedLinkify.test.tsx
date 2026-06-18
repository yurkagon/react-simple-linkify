import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { memo } from 'react';
import MemoizedLinkify from '../MemoizedLinkify';
import type { UrlComponentProps } from '../types';

describe('MemoizedLinkify', () => {
  it('is a React.memo component', () => {
    expect(MemoizedLinkify.$$typeof).toBe(Symbol.for('react.memo'));
  });

  it('has the correct displayName', () => {
    expect(MemoizedLinkify.displayName).toBe('MemoizedLinkify');
  });

  it('wraps the same underlying Linkify component', () => {
    expect(MemoizedLinkify.type).toBe(
      (memo(MemoizedLinkify.type) as typeof MemoizedLinkify).type,
    );
  });

  it('linkifies a plain string child', () => {
    render(<MemoizedLinkify>Visit https://example.com today</MemoizedLinkify>);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('preserves nested markup while linkifying text leaves', () => {
    render(
      <MemoizedLinkify>
        See <strong>docs at https://example.com</strong>
      </MemoizedLinkify>,
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
    expect(
      screen.getByText('docs at', { exact: false }).closest('strong'),
    ).not.toBeNull();
  });

  it('accepts a custom URL component', () => {
    const Badge = ({ url }: UrlComponentProps) => (
      <span data-testid="badge">{url}</span>
    );
    render(
      <MemoizedLinkify component={Badge}>
        link: https://example.com
      </MemoizedLinkify>,
    );
    expect(screen.getByTestId('badge')).toHaveTextContent(
      'https://example.com',
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders correctly to static markup (SSR)', () => {
    const html = renderToStaticMarkup(
      <MemoizedLinkify>see https://example.com here</MemoizedLinkify>,
    );
    expect(html).toContain(
      '<a target="_blank" rel="noopener noreferrer" href="https://example.com">https://example.com</a>',
    );
    expect(html).toContain('see ');
    expect(html).toContain(' here');
  });
});
