import React from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';

export default function Button({ children, onClick }) {
  function handleOnClick() {
    onClick();
  }

  return (
    <div className="grid my-3">
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
