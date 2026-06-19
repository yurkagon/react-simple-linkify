import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import Linkify from '../Linkify';
import type { UrlComponentProps } from '../types';

describe('Linkify', () => {
  it('linkifies a plain string child', () => {
    render(<Linkify>Visit https://example.com today</Linkify>);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('linkifies text across multiple and nested children, preserving markup', () => {
    render(
      <Linkify>
        First https://a.com here{' '}
        <strong>
          and bold https://b.com <em>plus https://c.com</em>
        </strong>
      </Linkify>,
    );

    const links = screen.getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://a.com',
      'https://b.com',
      'https://c.com',
    ]);
    // Nested markup is preserved, not flattened.
    expect(
      screen.getByText('and bold', { exact: false }).closest('strong'),
    ).not.toBeNull();
    expect(
      screen.getByText('plus', { exact: false }).closest('em'),
    ).not.toBeNull();
  });

  it('leaves non-string nodes (numbers, void elements) untouched', () => {
    render(
      <Linkify>
        {42}
        <br />
        link https://example.com
      </Linkify>,
    );
    expect(screen.getByText('42', { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('accepts a custom URL component', () => {
    const Custom = ({ url }: UrlComponentProps) => (
      <button type="button">{url}</button>
    );
    render(<Linkify component={Custom}>open https://example.com</Linkify>);

    expect(
      screen.getByRole('button', { name: 'https://example.com' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders correctly to static markup on the server (SSR)', () => {
    const html = renderToStaticMarkup(
      <Linkify>see https://example.com here</Linkify>,
    );
    expect(html).toContain(
      '<a target="_blank" rel="noopener noreferrer" href="https://example.com">https://example.com</a>',
    );
    expect(html).toContain('see ');
    expect(html).toContain(' here');
  });
});
