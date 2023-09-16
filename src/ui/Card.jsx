import React from 'react';

// import { Card as FlowbiteCard } from 'flowbite-react';
export default function Card({
  children,
  onClick,
  headerImage,
  alt = 'Card image',
}) {
  function handleClick() {
    onClick();
  }
  return (
    <div
      style={{ maxWidth: 768 + 'px' }}
      className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
    >
      <img
        onClick={handleClick}
        className="rounded-t-lg cursor-pointer"
        src={headerImage}
        alt={alt}
      />

      <div className="p-6 px-20">{children}</div>
    </div>
    // <FlowbiteCard
    //   // imgAlt={imgAlt}
    //   style={{ width: 500 + 'px' }}
    //   className="mx-auto"
    //   // imgSrc={headerImage}
    //   onClick={handleClick}
    //   renderImage={() => {
    //     <img imgSrc={headerImage} imgAlt={imgAlt} />;
    //   }}
    // >
    //   <img src={headerImage} alt={imgAlt} />
    //   {children}
    // </FlowbiteCard>
  );
}
