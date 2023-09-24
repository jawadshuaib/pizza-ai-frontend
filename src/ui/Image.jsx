import React from 'react';

export default function Image({ src, alt = '' }) {
  return <img src={src} alt={alt} className="mx-auto rounded-md" />;
}
