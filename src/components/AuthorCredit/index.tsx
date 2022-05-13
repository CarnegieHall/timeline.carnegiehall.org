import type { Author } from '$types/data';
import type { HTMLProps } from 'react';
import slugify from 'slugify';
import { ArrowLink } from '../ArrowLink';
import { HTML } from '../HTML';
import { useState } from 'react';
import { onKeyAction } from '$src/lib/utils';

export type AuthorCreditProps = {
  /** Author data from CMS */
  author: Author;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Author credit with short bio and link
 */
export function AuthorCredit({ author, className = '' }: AuthorCreditProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <style jsx>{`
        .author :global(p) {
          display: contents;
        }
        .author :global(p::after) {
          content: '\A';
          white-space: pre;
        }
        .author :global(p:not(:first-of-type)::before) {
          content: '\A';
          white-space: pre;
        }
      `}</style>
      <aside
        className={`author lazyrender mb-6  font-body md:text-xl ${className}`}
      >
        <div
          className={` italic ${expanded ? 'line-clamp-none' : 'line-clamp-4'}`}
        >
          <span className="font-bold">
            {`${author.first_name} ${author.last_name}`}
            {` `}
          </span>
          <HTML content={author.bio} />
        </div>
        <span
          className="italic cursor-pointer anchor hover:text-red"
          onClick={() => setExpanded((s) => !s)}
          onKeyDown={onKeyAction(() => setExpanded((s) => !s))}
          tabIndex={0}
          aria-label={expanded ? 'Show less' : 'Read more'}
        >
          {expanded ? 'Show less' : 'Read more'}
        </span>
      </aside>
    </>
  );
}
