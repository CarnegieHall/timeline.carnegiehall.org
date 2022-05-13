import type { HTMLProps } from 'react';

export type PullQuoteProps = {
  /** Quote */
  quote: string;
  /** Author of the quote */
  author?: string;
  /** Role of the author */
  role?: string;
} & HTMLProps<HTMLQuoteElement>;

const Seperator = () => (
  <span
    className="block mx-auto w-full max-w-[114px] h-2"
    style={{ background: 'currentColor' }}
  />
);

/**
 * ### Pull quote for stories and genres
 */
export function PullQuote({
  quote,
  role,
  author,
  className = ''
}: PullQuoteProps) {
  return (
    <blockquote className={`max-w-3xl text-center ${className}`}>
      <div>
        <Seperator />
        <span
          className="block py-10 font-bold tracking-tight font-display text-2lg md:text-3xl"
          dangerouslySetInnerHTML={{ __html: quote }}
        />
        <Seperator />
      </div>
      <div className="py-10 text-sm leading-5 label">
        {author && <span className="block">{author}</span>}
        {role && <span className="block">{role}</span>}
      </div>
    </blockquote>
  );
}
