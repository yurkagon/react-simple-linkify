import { createUrlRegex } from './constants';
import type { Token } from './types';

/**
 * Splits `text` into an ordered list of text/URL tokens in a single pass.
 *
 * Uses `String.prototype.matchAll`, which iterates without mutating any shared
 * regex state — unlike the previous replace + split + re-test approach, which
 * relied on a stateful global regex and could misclassify segments.
 */
export const tokenize = (text: string): Token[] => {
  const tokens: Token[] = [];
  let cursor = 0;

  for (const match of text.matchAll(createUrlRegex())) {
    const url = match[0];
    const start = match.index;

    if (start > cursor) {
      tokens.push({ type: 'text', value: text.slice(cursor, start) });
    }

    tokens.push({ type: 'url', value: url });
    cursor = start + url.length;
  }

  if (cursor < text.length) {
    tokens.push({ type: 'text', value: text.slice(cursor) });
  }

  return tokens;
};
