import React from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';

export default function Button({ children, custom = '', onClick = null }) {
  function handleOnClick() {
    if (onClick === null) return;
    onClick();
  }

  return (
    <div className={custom === '' ? 'grid my-3' : custom}>
      <FlowbiteButton
        size="lg"
        className="bg-orange-500"
        onClick={handleOnClick}
      >
        {children}
      </FlowbiteButton>
    </div>
  );
}
