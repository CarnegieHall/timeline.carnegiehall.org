import type { HTMLProps } from 'react';
import { HTML } from '../HTML';
import { Link } from '../Link';

export type MediaDetailsProps = {
  /** Caption for the media */
  caption?: string;
  /** Credit for the media */
  credit?: string;
  /** Link to media credits */
  creditLink?: string;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Simple caption + credits for medias
 */
export function MediaDetails({
  caption,
  credit,
  creditLink,
  className
}: MediaDetailsProps) {
  const CreditEl = creditLink ? Link : 'span';

  return (
    <>
      <style jsx global>{`
        .mediadetails p {
          margin-bottom: 0;
        }
      `}</style>
      <div
        className={`mediadetails font-ui text-center md:text-left text-sm mx-auto md:mx-0 ${className}`}
      >
        {caption && <HTML content={caption} />}
        {credit && (
          <CreditEl
            {...(creditLink ? { href: creditLink } : {})}
            className="block label text-xxs opacity-60 mt-[0.6rem]"
          >
            {credit}
          </CreditEl>
        )}
      </div>
    </>
  );
}
