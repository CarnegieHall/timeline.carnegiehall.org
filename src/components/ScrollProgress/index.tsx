import { useLayout } from '$src/stores/useLayout';
import { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';

/**
 * ### Scroll progress indicator bar
 */
export function ScrollProgress() {
  const { y } = useWindowScroll(),
    [progress, setProgress] = useState(0),
    menuOpen = useLayout((s) => s.menu.open);

  useEffect(() => {
    setProgress(y / (document.body.scrollHeight - window.innerHeight));
  }, [y]);

  return (
    <div
      className="fixed top-0 left-0 z-[9999] w-full h-[2px] md:h-[3px] scale-x-0 bg-red origin-left"
      style={{
        transform: `scaleX(${progress})`,
        visibility: menuOpen ? 'hidden' : 'visible'
      }}
    />
  );
}
