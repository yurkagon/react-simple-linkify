import type { ComponentType, ReactNode } from 'react';

/** A single chunk produced by {@link tokenize}: either plain text or a URL. */
export type Token =
  | { type: 'text'; value: string }
  | { type: 'url'; value: string };

/** Props every URL component receives. */
export interface UrlComponentProps {
  /** The matched URL, exactly as it appeared in the source text. */
  url: string;
}

/** A component used to render a matched URL. */
export type UrlComponent = ComponentType<UrlComponentProps>;

export interface LinkifyProps {
  /**
   * Content to scan. Only string segments are linkified; nested elements are
   * preserved and their string children are linkified recursively.
   */
  children: ReactNode;
  /** Component used to render each matched URL. Defaults to `DefaultUrl`. */
  component?: UrlComponent;
}
