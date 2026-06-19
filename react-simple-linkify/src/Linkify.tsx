import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import DefaultUrl from './DefaultUrl';
import { linkify } from './linkifyText';
import type { LinkifyProps, UrlComponent } from './types';

const Linkify = ({
  children,
  component = DefaultUrl,
}: LinkifyProps): ReactElement => <>{processNode(children, component)}</>;

Linkify.displayName = 'Linkify';

const processNode = (node: ReactNode, component: UrlComponent): ReactNode => {
  if (typeof node === 'string') {
    return linkify(node, component);
  }

  if (Array.isArray(node)) {
    return Children.map(node, (child) => processNode(child, component));
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    const { children } = node.props;
    if (children == null) {
      return node;
    }
    return cloneElement(node, undefined, processNode(children, component));
  }

  return node;
};

export default Linkify;
