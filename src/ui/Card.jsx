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
    <div className="lg:min-w-[768px] max-w-[768px] blockrounded-lg  bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  dark:bg-neutral-700">
      <div className="flex text-center justify-center">
        <img
          onClick={handleClick}
          className={`${
            onClick !== null && 'cursor-pointer '
          } rounded-t-lg max-h-[469px] object-contain`}
          src={imageLoaded ? headerImage : placeholderImage}
          alt={alt}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      <div className="p-6 px-3 sm:px-20">{children}</div>
    </div>
  );
}
