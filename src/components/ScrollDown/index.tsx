import type { HTMLProps } from 'react';
import { ReactComponent as ArrowIcon } from '$src/assets/icons/arrow-down.svg';
import { ScrollHide } from '../ScrollHide';

export type ScrollDownProps = {} & HTMLProps<HTMLDivElement>;

/**
 * ### Arrow to scroll down one full screen
 */
export function ScrollDown({ className = '' }: ScrollDownProps) {
  function scroll() {
    scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
  return (
    <ScrollHide threshold={100} className={className}>
      <ArrowIcon
        onClick={scroll}
        className={`h-12 transition-opacity cursor-pointer duration-500 stroke-current fill-current`}
      />
    </ScrollHide>
  );
}
