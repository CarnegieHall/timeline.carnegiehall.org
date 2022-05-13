import { Link } from '$src/components/Link';
import { PageGrid } from '$src/components/PageGrid';
import { SwipeCarousel, SwipeIndicator } from '$src/components/SwipeCarousel';
import { GlobalData } from '$src/lib/GlobalData';
import { useBreakpoint } from '$src/lib/hooks';
import { useExplorations } from '$src/stores/useExplorations';
import { useCallback, useContext, useState } from 'react';
import { ReactComponent as ArrowIcon } from '$src/assets/icons/caret-right.svg';

type ExploreListProps = {
  desktop: boolean;
  title: string;
  action?: {
    label: string;
    href: string;
  };
  items: {
    label: string;
    href: string;
  }[];
  withTimeline?: boolean;
  padded?: boolean;
};

function ExploreList({
  title,
  action,
  items,
  desktop,
  withTimeline,
  padded
}: ExploreListProps) {
  const Wrapper = desktop ? 'div' : PageGrid;

  return (
    <>
      <style jsx>{`
        .timeline::before,
        .timeline::after {
          content: '';
          position: absolute;
          left: -14px;
        }

        .timeline::before {
          top: 0;
          bottom: 0;
          width: 1px;
          background: currentColor;
        }

        .timeline:last-child::before {
          bottom: unset;
          height: 6px;
        }

        .timeline:first-child::before {
          top: 6px;
        }

        .timeline::after {
          top: 6px;
          width: 7px;
          height: 7px;
          border: 1px solid currentColor;
          border-radius: 7px;
          transform: translateX(-50%);
          background: black;
        }

        .timeline:last-child::after {
          background: var(--color-grey-100);
        }
      `}</style>

      <Wrapper
        className={`scrollable ${
          desktop
            ? 'w-1/3 px-16 border-r last:border-r-0'
            : 'h-[100vh] py-10 pb-[40vh]'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-bold font-display">{`${title} (${items.length})`}</h2>
          {action && (
            <Link
              className="transition-colors border-b text-xsm font-ui hover:text-red"
              href={action.href}
            >
              {action.label}
            </Link>
          )}
        </div>
        {items.length ? (
          <ul className={`mt-4 ${withTimeline && 'pl-[14px]'}`}>
            {items.map(({ href, label }: any, i: number) => (
              <li
                className={`relative label text-xsm  ${
                  padded && 'pb-[1.2rem]'
                }  ${withTimeline ? 'timeline' : ''}`}
                key={i}
              >
                <Link
                  className="transition-colors hover:text-red line-clamp-2"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <span className="flex items-center mt-4 text-xsm label text-grey-700">
            Select a story or genre to begin
            <ArrowIcon className="w-3 h-3 mb-[2px] ml-1 fill-current" />
          </span>
        )}
      </Wrapper>
    </>
  );
}

/**
 * ### Global site menu and about page
 */
export function Explore() {
  const { stories, genres } = useContext(GlobalData),
    explorations = useExplorations(useCallback((s) => s.explorations, [])),
    isDesktop = useBreakpoint('(min-width: 900px)'),
    Nav = isDesktop ? 'div' : (SwipeCarousel as any),
    [activeView, setActiveView] = useState(0);

  return (
    <PageGrid className={`px-[var(--page-gutter)] ${isDesktop && 'py-24'}`}>
      <Nav
        className={isDesktop ? 'flex -mx-16' : ''}
        onSlideChange={(slide: number) => setActiveView(slide)}
        fullWidthValue="calc(100vw - (var(--page-gutter) * 2))"
        withIndicator={false}
      >
        <ExploreList
          desktop={isDesktop}
          title="Your Explorations"
          items={explorations.map(({ href, title }: any) => ({
            href,
            label: title
          }))}
          padded
          withTimeline
        />
        <ExploreList
          desktop={isDesktop}
          title="Stories"
          padded
          action={{
            label: 'View All',
            href: '/stories'
          }}
          items={
            stories?.map(({ slug, title }: any) => ({
              href: `/stories/${slug}`,
              label: title
            })) || []
          }
        />
        <ExploreList
          desktop={isDesktop}
          title="Genres"
          action={{
            label: 'View Timeline',
            href: '/timeline'
          }}
          items={
            genres?.map(({ slug, name }: any) => ({
              href: `/genres/${slug}`,
              label: name
            })) || []
          }
        />
      </Nav>
      {!isDesktop && (
        <SwipeIndicator
          className="absolute z-10 left-1/2 -translate-x-1/2 bottom-[35vh]"
          length={3}
          activeSlide={activeView}
        />
      )}
    </PageGrid>
  );
}
