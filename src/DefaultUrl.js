import React from 'react';

const DefaultUrl = ({ url, ...props }) => (
  <a href={url} {...props} rel="noopener noreferrer" target="_blank">
    {url}
  </a>
);

export default DefaultUrl;
