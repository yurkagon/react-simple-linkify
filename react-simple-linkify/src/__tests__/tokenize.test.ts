import { describe, expect, it } from 'vitest';
import { tokenize } from '../tokenize';
import { createUrlRegex } from '../constants';

describe('tokenize', () => {
  it('returns a single text token when there is no URL', () => {
    expect(tokenize('just plain text')).toEqual([
      { type: 'text', value: 'just plain text' },
    ]);
  });

  it('returns an empty array for an empty string', () => {
    expect(tokenize('')).toEqual([]);
  });

  it('splits text around a single URL', () => {
    expect(tokenize('go to https://example.com now')).toEqual([
      { type: 'text', value: 'go to ' },
      { type: 'url', value: 'https://example.com' },
      { type: 'text', value: ' now' },
    ]);
  });

  it('handles multiple URLs in one string', () => {
    expect(tokenize('a https://a.com b https://b.com c')).toEqual([
      { type: 'text', value: 'a ' },
      { type: 'url', value: 'https://a.com' },
      { type: 'text', value: ' b ' },
      { type: 'url', value: 'https://b.com' },
      { type: 'text', value: ' c' },
    ]);
  });

  it('handles adjacent URLs with no text between/around them', () => {
    const tokens = tokenize('https://a.com https://b.com');
    expect(tokens.filter((t) => t.type === 'url').map((t) => t.value)).toEqual([
      'https://a.com',
      'https://b.com',
    ]);
  });

  it('emits no leading/trailing empty text tokens when a URL is on the edge', () => {
    expect(tokenize('https://example.com')).toEqual([
      { type: 'url', value: 'https://example.com' },
    ]);
  });

  it('excludes trailing punctuation from the matched URL', () => {
    expect(tokenize('see https://example.com.')).toEqual([
      { type: 'text', value: 'see ' },
      { type: 'url', value: 'https://example.com' },
      { type: 'text', value: '.' },
    ]);
  });

  it('matches http, https, ftp and file schemes', () => {
    for (const url of [
      'http://example.com',
      'https://example.com',
      'ftp://files.example.com/x',
      'file://server/path',
    ]) {
      expect(tokenize(url)).toEqual([{ type: 'url', value: url }]);
    }
  });

  it('matches schemes case-insensitively', () => {
    expect(tokenize('HTTPS://Example.COM')).toEqual([
      { type: 'url', value: 'HTTPS://Example.COM' },
    ]);
  });

  it('does not treat a bare domain (no scheme) as a URL', () => {
    expect(tokenize('visit example.com please')).toEqual([
      { type: 'text', value: 'visit example.com please' },
    ]);
  });

  it('preserves query strings and fragments', () => {
    const url = 'https://www.youtube.com/watch?v=9NSzl8DtdM4';
    expect(tokenize(`watch ${url}`)).toEqual([
      { type: 'text', value: 'watch ' },
      { type: 'url', value: url },
    ]);
  });

  // Regression: the old implementation reused a single global regex via
  // `.test()`, whose mutable `lastIndex` made repeated calls alternate
  // true/false. A fresh regex per call must classify identical input the same
  // way every time.
  it('classifies the same URL consistently across repeated checks', () => {
    const url = 'https://example.com';
    for (let i = 0; i < 5; i += 1) {
      const regex = createUrlRegex();
      expect(regex.test(url)).toBe(true);
    }
  });
});
