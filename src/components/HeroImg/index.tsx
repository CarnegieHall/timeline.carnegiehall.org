import { usePageLayout } from '$src/stores/useLayout';
import { useEffect, useState } from 'react';
import type { HTMLProps } from 'react';
import { useWindowScroll } from 'react-use';
import { Img, ImgProps } from '../Img';
import { PageGrid } from '../PageGrid';
import { StoryHeading, StoryHeadingProps } from '../StoryHeading';

export type HeroImgProps = {
  /** Image for hero */
  image: ImgProps;
  /** Overlay color */
  color: string;
  /** Optional heading */
  withStoryHeading?: StoryHeadingProps;
  animated?: boolean;
  attribution?: string;
} & HTMLProps<HTMLDivElement>;

export function AdaptiveHeader() {
  const { y } = useWindowScroll(),
    [top, setTop] = useState(true);

  useEffect(() => {
    if (!top && y > 0) {
      return;
    }

    setTop(y === 0);
  }, [y, top]);

  usePageLayout(
    {
      header: {
        theme: top ? 'minimal' : 'default',
        fixed: true
      }
    },
    [top]
  );
  return null;
}

/**
 * ### Full width hero image, used for stories
 */
export function HeroImg({
  image,
  color,
  withStoryHeading,
  attribution,
  children,
  className = ''
}: HeroImgProps) {
  return (
    <div
      className={`!col-span-full flex flex-col justify-end sticky top-0 h-screen ${className}`}
      style={{ minHeight: '600px' }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: color }}
      >
        <Img
          className="object-cover w-full h-full mix-blend-multiply"
          src={image.src}
          alt={image.alt}
          title={attribution}
        />
      </div>
      {withStoryHeading && (
        <PageGrid
          className="z-10 relative bg-gradient-to-t from-black to-transparent h-[50%]"
          style={{ minHeight: '400px' }}
        >
          <div className="flex">
            <StoryHeading {...withStoryHeading} inverted />
            {children}
          </div>
        </PageGrid>
      )}
    </div>
  );
}
