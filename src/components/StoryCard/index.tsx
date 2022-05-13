import type { HTMLProps } from 'react';
import { ArrowLink } from '../ArrowLink';
import { Img } from '../Img';
import { Link } from '../Link';
import { NumberLabel } from '../NumberLabel';

export type StoryCardProps = {
  /** Number of story */
  number: number;
  /** Title of story */
  title: string;
  /** Feature image of story */
  image: {
    src: string;
    alt: string;
  };
  /** Author of story */
  authors?: string[];
  /** URL to story */
  href: string;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Link card to a story or other article
 */
export function StoryCard({
  number,
  title,
  image,
  authors,
  href,
  ...props
}: StoryCardProps) {
  return (
    <div {...props}>
      <Link className="block group" href={href} aria-label={title}>
        <NumberLabel number={number} />
        <h2 className="my-4 font-bold font-display line-clamp-2">{title}</h2>
        <div className="overflow-hidden ">
          <Img
            src={image.src}
            alt={image.alt}
            className="w-full transition-transform duration-300 origin-center mix-blend-multiply transform-gpu group-hover:scale-110"
            imgixParams={{ ar: '1:1', fit: 'crop' }}
          />
        </div>
        {authors && (
          <span className={`block py-4 label text-sm  md:text-xsm`}>
            {authors.join(', ')}
          </span>
        )}
        <ArrowLink
          className="block transition-transform duration-300 transform-gpu group-hover:translate-x-2"
          href={href}
          aria-label={title}
        />
      </Link>
    </div>
  );
}
