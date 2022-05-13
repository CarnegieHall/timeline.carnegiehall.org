import { ARTICLE_TEXT_STYLES } from '$src/containers/Article';
import { BREAKPOINTS } from '$src/lib/consts';
import { useBreakpoint } from '$src/lib/hooks';
import type { HTMLProps } from 'react';
import { HTML } from '../HTML';
import { Link } from '../Link';
import { SectionDivider } from '../SectionDivider';
import { TwoUp } from '../TwoUp';

export type ScrollSectionsProps = {
  /** Title of the section */
  title: string;
  /** Sections */
  sections: {
    id: number;
    label: string;
    anchor: string;
    content: string;
    link?: string;
  }[];
  /** Optional offset top for sticky positioning */
  stickyOffset?: number;
} & HTMLProps<HTMLDivElement>;

function Section({
  content,
  anchor,
  reveal,
  label,
  link = '',
  stickyOffset
}: any) {
  return (
    <div className="relative mb-16">
      <style jsx>{`
        .content :global(p:first-of-type) {
          display: inline;
        }
      `}</style>
      <span
        id={anchor}
        className="absolute invisible"
        style={{ top: `-${stickyOffset}px` }}
      />
      <div className="content">
        <Link className="mr-2 anchor" href={link || ''}>
          {label}
        </Link>
        <HTML content={content} />
      </div>
    </div>
  );
}

/**
 * ### Collection of sections with titles and scroll and highlight on desktop, stacking on mobile
 */
export function ScrollSections({
  title,
  sections,
  stickyOffset = 16,
  className = ''
}: ScrollSectionsProps) {
  const isDesktop = useBreakpoint(`(min-width: ${BREAKPOINTS.md})`),
    LabelWrap = isDesktop ? 'div' : SectionDivider;

  return (
    <SectionDivider
      dividers={isDesktop ? undefined : { top: 'none', bottom: 'standard' }}
      className={className}
    >
      <TwoUp
        left={
          <div className="md:sticky" style={{ top: `${stickyOffset}px` }}>
            <LabelWrap dividers={{ top: 'none', bottom: 'standard' }}>
              <h1 className="py-4 text-center label md:py-0 md:text-left">
                {title}
              </h1>
            </LabelWrap>
            <ul className="hidden text-lg md:block font-body">
              {sections.map(({ label, id }) => (
                <li className={`mt-2`} key={id}>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        }
        right={
          <div className={ARTICLE_TEXT_STYLES}>
            {sections.map(({ id, ...props }) => (
              <Section stickyOffset={stickyOffset} key={id} {...props} />
            ))}
          </div>
        }
      />
    </SectionDivider>
  );
}
