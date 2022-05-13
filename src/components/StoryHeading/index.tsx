import { NumberLabel } from '$src/components/NumberLabel';
import type { HTMLProps } from 'react';
import { Heading } from '../Heading';

export type StoryHeadingProps = {
  /** Title of story */
  title: string;
  /** Author of story */
  authors: {
    first_name: string;
    last_name: string;
  }[];
  /** Position of story */
  position: number;
  inverted?: boolean;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Heading with author and position for stories
 */
export function StoryHeading({
  title,
  authors,
  position,
  inverted,
  className = ''
}: StoryHeadingProps) {
  return (
    <div className={`md:mb-12 ${inverted && 'text-grey-100'} ${className}`}>
      <Heading heading={title} />
      <div className="flex items-center mt-1 md:mt-6">
        <NumberLabel
          className={`mr-2 ${inverted && 'bg-grey-100 !text-black'}`}
          noBlend
          number={position}
        />
        {!!authors.length && (
          <span className="text-sm font-medium font-ui md:text-base">
            {`By ${authors
              ?.map(
                ({ first_name, last_name }: any) => `${first_name} ${last_name}`
              )
              .join(' / ')}`}
          </span>
        )}
      </div>
    </div>
  );
}
