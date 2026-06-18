import { useRef, useEffect, useState } from 'react';
import './SectionBackground.css';

/**
 * Renders a full-bleed background image behind its parent section.
 * Dynamically sets the parent's min-height so the complete image is
 * visible without cropping, and re-adjusts on window resize / mobile.
 */
export default function SectionBackground({ image, tint = 'light' }) {
  const layerRef = useRef(null);
  const [imgAspect, setImgAspect] = useState(null);

  /* Load the image to discover its natural aspect ratio */
  useEffect(() => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      setImgAspect(img.naturalHeight / img.naturalWidth);
    };
    img.src = image;
  }, [image]);

  /* Set parent section min-height = width × aspect-ratio so
     the entire image fits. A ResizeObserver keeps it responsive. */
  useEffect(() => {
    if (!imgAspect || !layerRef.current) return;
    const section = layerRef.current.parentElement;
    if (!section) return;

    const update = () => {
      const w = section.offsetWidth;
      section.style.minHeight = `${w * imgAspect}px`;
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(section);
    return () => {
      ro.disconnect();
      section.style.minHeight = '';
    };
  }, [imgAspect]);

  if (!image) return null;

  return (
    <div
      ref={layerRef}
      className={`section-bg-layer section-bg-layer--${tint}`}
      style={{ backgroundImage: `url(${image})` }}
      aria-hidden="true"
    />
  );
}
