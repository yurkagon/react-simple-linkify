import { Fragment, type ReactElement } from 'react';
import DefaultUrl from './DefaultUrl';
import { tokenize } from './tokenize';
import type { UrlComponent } from './types';

/**
 * Converts a plain string into an array of React elements, rendering each
 * detected URL with `Component` and wrapping text segments in fragments.
 *
 * Keys are derived from the token index, which is stable for a given input.
 */
export const linkify = (
  text: string,
  Component: UrlComponent = DefaultUrl,
): ReactElement[] =>
  tokenize(text).map((token, index) =>
    token.type === 'url' ? (
      <Component key={`url-${index}`} url={token.value} />
    ) : (
      <Fragment key={`text-${index}`}>{token.value}</Fragment>
    ),
  );
