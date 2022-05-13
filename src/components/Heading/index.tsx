import type { HTMLProps } from 'react';

export type HeadingProps = {
  /** Heading */
  heading: string;
} & HTMLProps<HTMLHeadingElement>;

/**
 * ### Simple heading display
 */
export function Heading({ heading, className = '' }: HeadingProps) {
  return (
    <h1
      className={`font-display font-bold text-1xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl tracking-tight ${className}`}
    >
      {heading}
    </h1>
  );
}
