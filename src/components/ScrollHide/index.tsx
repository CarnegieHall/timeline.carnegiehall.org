import { SCROLL_THRESHOLD } from '$src/lib/consts';
import type { HTMLProps } from 'react';
import { useWindowScroll } from 'react-use';

export type ScrollHideProps = {
  as?: any;
  threshold?: number;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Wrapper component that hides when scrolled past top of viewport
 */
export function ScrollHide({
  as = 'div',
  children,
  threshold = SCROLL_THRESHOLD,
  className = '',
  ...props
}: ScrollHideProps) {
  const Component = as,
    { y } = useWindowScroll();

  return (
    <Component
      style={{ opacity: y < threshold ? 1 : 0 }}
      className={`transition-opacity duration-500 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
