import type { HTMLProps } from 'react';
import { useRef, useState } from 'react';
import { useHoverDirty } from 'react-use';

export type StackImgProps = {
  image: string;
  alt: string;
  onHover(): void;
  overlay: string;
} & HTMLProps<HTMLDivElement>;

const StackImg = ({
  image,
  alt,
  onHover,
  overlay,
  className = ''
}: StackImgProps) => {
  const ref = useRef(null),
    isHovering = useHoverDirty(ref),
    size = `h-80 w-80`;

  isHovering && onHover();

  return (
    <>
      <style jsx>
        {`
          .wrapper:last-child > :global(*) {
            right: 0;
          }
        `}
      </style>
      <div className={`wrapper relative ${className}`} ref={ref}>
        <div
          style={{ background: overlay }}
          className={`absolute ${size} z-10 opacity-0 hover:opacity-50 transition-opacity`}
        />
        <div className={`absolute ${size} shadow-card object-cover`}>
          <img className="w-full h-full" src={image} alt={alt} />
        </div>
        <div className={size} />
      </div>
    </>
  );
};

export type ImageStackProps = {
  /** Images for the stack */
  images: { caption: string; image: string }[];
  /** Colour to show when an image is focussed */
  overlayColour: string;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Horizontal stack of images with hover/click interaction
 */
export function ImageStack({
  images,
  overlayColour,
  className = '',
  ...props
}: ImageStackProps) {
  const [activeCaption, setActiveCaption] = useState(images[0]?.caption);

  if (!images.length) {
    return null;
  }

  return (
    <div className="bg-black" {...props}>
      <div
        className="lazyrender grid overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`
        }}
      >
        {images.map(({ image, caption }, i) => (
          <StackImg
            style={{ zIndex: 100 - i }}
            className="hover:!z-[999]"
            image={image}
            alt={caption}
            overlay={overlayColour}
            onHover={() => setActiveCaption(caption)}
            onClick={() => setActiveCaption(caption)}
            key={i}
          />
        ))}
      </div>
      <div className="text-center text-white p-9 label">{activeCaption}</div>
    </div>
  );
}
