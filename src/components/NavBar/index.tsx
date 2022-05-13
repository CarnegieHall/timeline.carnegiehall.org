import { ReactComponent as ArrowIcon } from '$src/assets/icons/arrow-circle.svg';
import { BREAKPOINTS, SCROLL_THRESHOLD } from '$src/lib/consts';
import { useBreakpoint } from '$src/lib/hooks';
import { HTMLProps, useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';
import { AudioPlayer } from '../AudioPlayer';
import { Link } from '../Link';
import { PageGrid } from '../PageGrid';
import { SwipeCarousel } from '../SwipeCarousel';

export type NavBarProps = {
  /** Navigation CTA */
  cta?: {
    label: string;
    href: string;
  };
  /** Title */
  title?: string;
  /** Optional preformatted period for title */
  period?: { start: string; end: string };
  /** Direction nav arrow points */
  direction?: 'up' | 'down';
  /** Optional shadow highlight colour */
  highlight?: string;
  /** Optionally show once start scrolling */
  showOnScroll?: boolean;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Global timeline navigation with music player
 */
export function NavBar({
  title,
  period,
  direction = 'up',
  cta = {
    label: 'Explore Timeline',
    href: '/timeline'
  },
  highlight,
  showOnScroll,
  className = ''
}: NavBarProps) {
  const { y } = useWindowScroll(),
    isDesktop = useBreakpoint(`(min-width: ${BREAKPOINTS.lg})`, false),
    [pastThreshold, setPastThreshold] = useState(false);

  const Title = () => (
    <div className="flex items-center justify-center flex-1 h-full text-center">
      {title || `${period?.start}—${period?.end}`}
    </div>
  );

  useEffect(() => {
    if (
      !showOnScroll ||
      (y > SCROLL_THRESHOLD && pastThreshold) ||
      (y < SCROLL_THRESHOLD && !pastThreshold)
    ) {
      return;
    }

    setPastThreshold(y > SCROLL_THRESHOLD);
  }, [showOnScroll, pastThreshold, y]);

  return (
    <PageGrid
      style={{
        ...(highlight ? { '--card-shadow-color': highlight } : {}),
        ...(showOnScroll
          ? { transform: `translateY(${pastThreshold ? 0 : '100%'})` }
          : {})
      }}
      className={`sticky bottom-0 left-0 w-full z-50 py-3 md:py-4 bg-grey-100 font-ui font-bold text-lg md:text-2xl shadow-card transition-transform duration-300 ease-in-out ${className}`}
    >
      <div className="flex items-center justify-between">
        <Link
          href={cta.href}
          className="flex items-center w-10 transition-colors cursor-pointer hover:text-red lg:w-auto lg:flex-1"
        >
          <div className="mr-2 ">
            <ArrowIcon
              className={`w-6 h-6 md:w-10 md:h-10 fill-current
                ${direction === 'up' && 'rotate-180'}
              `}
            />
          </div>
          <span className="hidden lg:block">{cta.label}</span>
        </Link>

        {isDesktop ? (
          <Title />
        ) : (
          <SwipeCarousel fullWidth={false} className="justify-center flex-1">
            <Title />
            <AudioPlayer displayMode="info" />
          </SwipeCarousel>
        )}

        <div className="flex w-10 lg:w-auto lg:flex-1">
          <AudioPlayer
            className="w-full"
            displayMode={isDesktop ? 'full' : 'controls'}
          />
        </div>
      </div>
    </PageGrid>
  );
}
