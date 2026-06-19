import type { AnchorHTMLAttributes } from 'react';
import type { UrlComponentProps } from './types';

export type DefaultUrlProps = UrlComponentProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

/**
 * Default renderer for a matched URL: a safe, new-tab anchor.
 *
 * `target`/`rel` come first so callers can override them via extra props.
 */
const DefaultUrl = ({ url, ...rest }: DefaultUrlProps) => (
  <a target="_blank" rel="noopener noreferrer" {...rest} href={url}>
    {url}
  </a>
);

export default DefaultUrl;
