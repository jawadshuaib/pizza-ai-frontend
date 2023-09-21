import React from 'react';
import Paragraph from './Paragraph';

export default function Flag({ color, children }) {
  return (
    <>
      <Paragraph>
        <span className={`text-2xl bg-${color}-200 px-3 rounded-md`}>
          {children}
        </span>
      </Paragraph>
    </>
  );
}
