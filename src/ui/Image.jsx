import React from 'react';

export default function Image({ src, alt = '', align = null, custom = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-md ${align != null ? align : 'mx-auto'} ${
        custom != null ? custom : ''
      }`}
    />
  );
}
