import type { HTMLProps, ReactNode } from 'react';

export type TwoUpProps = {
  left: ReactNode;
  right: ReactNode;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Basic two-up layout
 */
export function TwoUp({ left, right, className = '' }: TwoUpProps) {
  return (
    <section
      className={`lazyrender md:grid md:grid-cols-[1fr,1px,1fr]${className}`}
    >
      <div className="md:pr-14">{left}</div>
      <div className="hidden md:block w-px bg-grey-100"></div>
      <div className="md:pl-14">{right}</div>
    </section>
  );
}
