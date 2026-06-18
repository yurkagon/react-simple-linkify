// Supported URL schemes.
const PROTOCOLS = 'https?|ftp|file';

// Characters allowed inside a URL...
const PATH_CHARS = '-A-Z0-9+&@#/%?=~_|!:,.;';
// ...and the subset a URL is allowed to end with, so trailing punctuation
// (e.g. the period in "see https://example.com.") is left out of the match.
const END_CHARS = '-A-Z0-9+&@#/%=~_|';

/** Source pattern matching an absolute URL. Case-insensitive when compiled. */
export const URL_PATTERN = `\\b(?:${PROTOCOLS})://[${PATH_CHARS}]*[${END_CHARS}]`;

/**
 * Returns a fresh global, case-insensitive URL regex.
 *
 * A new instance is created per call on purpose: a shared global regex carries
 * mutable `lastIndex` state, which makes reusing it across `.test()`/`.exec()`
 * calls return alternating results. Each caller gets its own clean instance.
 */
export const createUrlRegex = (): RegExp => new RegExp(URL_PATTERN, 'gi');
