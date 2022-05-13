import type { HTMLProps } from 'react';

export type SectionTitleProps = {
  /** Title of the section */
  title: string;
} & HTMLProps<HTMLHeadingElement>;

/**
 * ### Full width heading for sections of content
 */
export function SectionTitle({
  title,
  className = '',
  ...props
}: SectionTitleProps) {
  return (
    <h2
      className={`font-ui font-bold p-3 w-full max-w-lg border leading-5 text-sm text-center ${className}`}
      {...props}
    >
      {title}
    </h2>
  );
}
