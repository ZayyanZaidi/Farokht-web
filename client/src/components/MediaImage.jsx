import { useEffect, useState } from 'react';
import { resolveImageUrl } from '../utils/media';

export default function MediaImage({ src, alt = '', fallbackType = 'post', className = '', ...props }) {
  const [url, setUrl] = useState(() => resolveImageUrl(src, fallbackType));

  useEffect(() => {
    setUrl(resolveImageUrl(src, fallbackType));
  }, [src, fallbackType]);

  return (
    <img
      {...props}
      className={className}
      src={url}
      alt={alt}
      loading="lazy"
      onError={() => setUrl(resolveImageUrl('', fallbackType))}
    />
  );
}
