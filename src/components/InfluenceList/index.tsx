import { ReactComponent as Arrow } from '$src/assets/icons/caret-left.svg';
import type { HTMLProps } from 'react';
import { Link } from '../Link';

type Genre = { name: string; slug: string };

export type InfluenceListProps = {
  /** Visual theme of the list */
  theme?: 'list' | 'bars';
  /** Direct influences */
  direct: Genre[];
  /** Indirect influences */
  indirect: Genre[];
  /** Direction influences go */
  direction: 'backwards' | 'forwards';
} & HTMLProps<HTMLDivElement>;

/**
 * ### List of direct and indirect influences
 */
export function InfluenceList({
  theme = 'list',
  direct,
  indirect,
  direction,
  className = ''
}: InfluenceListProps) {
  const listStyle = `relative
      ${theme === 'bars' && 'p-6 text-center odd:bg-grey-300 even:bg-grey-50'}
      ${theme === 'list' && `my-px ${direction === 'forwards' && 'text-right'}`}
    `;

  return (
    <div
      className={`label text-sm leading-5 md:text-xsm break-words
        ${theme === 'list' && 'max-w-[200px]'}
        ${className}
      `}
    >
      <ul>
        {direct.map(({ name, slug }) => (
          <li className={listStyle} key={slug}>
            <div className="inline-flex transition-colors hover:text-red">
              <Arrow
                className={`fill-current h-[8px] w-[8px] absolute top-1/2
                ${
                  direction === 'forwards'
                    ? theme === 'list'
                      ? '-right-3'
                      : 'right-3'
                    : theme === 'list'
                    ? '-left-3'
                    : 'left-3'
                }
              `}
                style={{
                  transform: `translate(
                  ${
                    theme === 'list'
                      ? direction === 'backwards'
                        ? '-100%'
                        : '100%'
                      : '0'
                  }, -60%) ${direction === 'forwards' ? 'rotate(180deg)' : ''}`
                }}
              />
              <Link href={`/genres/${slug}`}>{name}</Link>
            </div>
          </li>
        ))}
        {theme === 'list' && <hr className="my-[12px]" />}
        {indirect.map(({ name, slug }) => (
          <li
            className={`${listStyle} transition-colors hover:text-red`}
            key={slug}
          >
            <Link href={`/genres/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
