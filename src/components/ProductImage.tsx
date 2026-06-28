'use client';

import { useEffect, useState } from 'react';

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg width='800' height='600' viewBox='0 0 800 600' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23f1f5f9'/%3E%3Crect x='230' y='170' width='340' height='260' rx='18' fill='%23ffffff' stroke='%23cbd5e1' stroke-width='6'/%3E%3Ccircle cx='330' cy='265' r='42' fill='%23dbeafe'/%3E%3Cpath d='M260 392L363 306L432 362L477 326L540 392H260Z' fill='%2393c5fd'/%3E%3Cpath d='M314 456H486' stroke='%2394a3b8' stroke-width='18' stroke-linecap='round'/%3E%3Cpath d='M352 494H448' stroke='%23cbd5e1' stroke-width='14' stroke-linecap='round'/%3E%3C/svg%3E";

export default function ProductImage({ src, alt, className }: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src?.trim() || FALLBACK_IMAGE);

  useEffect(() => {
    setImageSrc(src?.trim() || FALLBACK_IMAGE);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setImageSrc(FALLBACK_IMAGE)}
    />
  );
}
