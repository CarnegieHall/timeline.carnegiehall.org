import { onKeyAction } from '$src/lib/utils';
import { Children, HTMLProps, useEffect, useRef, useState } from 'react';
import { useMeasure } from 'react-use';

const OVERLAP_HEIGHT = 78;

function Card({
  index,
  ejected,
  children,
  className,
  style = {},
  ...props
}: any) {
  const [ref, { height }] = useMeasure(),
    innerRef = useRef(null),
    [y, setY] = useState(0);

  useEffect(() => {
    if (innerRef?.current) {
      setY((innerRef.current as any).getBoundingClientRect().y);
    }
  }, [innerRef, ejected, setY]);

  return (
    <div className="lazyrender" ref={ref as any}>
      <div
        ref={innerRef}
        style={{
          zIndex: index,
          marginTop: index === 0 ? 0 : `${OVERLAP_HEIGHT - height}px`,
          ...(ejected
            ? {
                transform: `translateY(-${y - OVERLAP_HEIGHT}px)`
              }
            : {})
        }}
        className={`relative hover:-translate-y-10 delay-100 transition-transform
        ${!ejected ? 'shadow-card' : ''}
        ${!height ? 'invisible' : ''}
        ${className}
        `}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * ### Fullscreen stack of cards with hover/click interaction
 */
export function CardStack({
  onEject,
  onEjectFinish,
  className,
  ejected,
  children = ''
}: {
  onEject(i: number): void;
  onEjectFinish(i: number): void;
  ejected?: number;
} & HTMLProps<HTMLDivElement>) {
  const hasEjected = typeof ejected !== 'undefined';

  function handleTransitionEnd(i: number) {
    if (ejected === i) {
      onEjectFinish(i);
    }
  }

  return (
    <section className={`pt-7 ${className}`}>
      {Children.map(children, (child, i) => (
        <Card
          index={i}
          ejected={ejected === i}
          className={`
          ${ejected === i ? 'duration-500' : ''}
          ${
            ejected !== i && hasEjected
              ? 'duration-500 translate-y-full opacity-0'
              : ''
          }
          `}
          onTransitionEnd={() => handleTransitionEnd(i)}
          onClick={() => onEject(i)}
          onKeyDown={onKeyAction(() => onEject(i))}
          tabIndex={0}
          aria-label="Open"
          key={i}
        >
          {child}
        </Card>
      ))}
    </section>
  );
}
