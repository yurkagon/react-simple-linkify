import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';

import { REGEX_URL } from './constants';
import { splitByURL } from './utils';

import DefaultUrl from './DefaultUrl';

const linkify = (text, Component = DefaultUrl) => {
  const dataArray = splitByURL(text);

  const result = dataArray.map((el, index) => {
    const isUrl = REGEX_URL.test(el);
    if (!isUrl) {
      return (
        <Fragment key={`text${index}`}>{el}</Fragment>
      );
    }

    return <Component key={`url${index}`} url={el} />;
  });

  return result;
};

const Linkify = memo(({ children: text, component }) =>
  linkify(text, component)
);

Linkify.propTypes = {
  children: PropTypes.string.isRequired,
  component: PropTypes.func
};

export {
  Linkify as default,
  linkify
};
