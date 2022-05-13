import { BREAKPOINTS } from '$src/lib/consts';
import { useBreakpoint } from '$src/lib/hooks';
import { useTimeline } from '$src/stores/useTimeline';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import DesktopView from './DesktopView';
import MobileView from './MobileView';

export type TimelineProps = {
  data: any;
};

/**
 * ### Timeline visualization component
 */
export function Timeline({ data }: TimelineProps) {
  const isMobile = useBreakpoint(`(max-width: ${BREAKPOINTS.lg})`);

  return (
    <div className="relative flex justify-center w-full timeline">
      {isMobile ? <MobileView data={data} /> : <DesktopView data={data} />}
    </div>
  );
}
