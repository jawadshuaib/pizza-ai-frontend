import React, { useState } from 'react';
import placeholderImage from '../assets/placeholder.png';

export default function Card({
  children,
  onClick = null,
  headerImage,
  alt = 'Card image',
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleClick() {
    if (onClick === null) return;
    onClick();
  }
  return (
    <div
      style={{ maxWidth: 768 + 'px' }}
      className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  dark:bg-neutral-700"
    >
      <img
        onClick={handleClick}
        className={`${
          onClick !== null && 'cursor-pointer '
        } rounded-t-lg min-w-[768px] max-h-[469px] object-contain`}
        src={imageLoaded ? headerImage : placeholderImage}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />

      <div className="p-6 px-20">{children}</div>
    </div>
  );
}
