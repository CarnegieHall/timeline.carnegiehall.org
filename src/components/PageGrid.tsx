import { forwardRef } from 'react';

/**
 * Page grid
 */
export const PageGrid = forwardRef(function PageGrid(
  {
    as = 'div',
    children,
    className = '',
    rows,
    ...props
  }: { el?: string | any } & any,
  ref
) {
  const Element: any = as;

  return (
    <>
      <style jsx>{`
        .pageGrid > :global(*) {
          grid-column: 2 / 3;
        }
      `}</style>

      <Element
        ref={ref}
        className={`grid pageGrid !col-span-full relative grid-cols-[var(--grid-page)] auto-rows-min ${className}`}
        style={{ gridTemplateRows: rows }}
        {...props}
      >
        {children}
      </Element>
    </>
  );
});
