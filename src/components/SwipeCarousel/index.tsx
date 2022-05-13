import { Children, HTMLProps, useEffect, useState } from 'react';
import Swipeable, { SwipeableViewsProps } from 'react-swipeable-views';
import { useMeasure } from 'react-use';

export function SwipeIndicator({
  length,
  activeSlide,
  className = ''
}: {
  length: number;
  activeSlide: number;
} & HTMLProps<HTMLDivElement>) {
  return (
    <div className={`flex ${className}`}>
      {Array.from(Array(length).keys()).map((item, i) => (
        <span
          style={{ background: 'currentColor' }}
          className={`${
            i === activeSlide ? 'opacity-100' : 'opacity-25'
          } block w-[6px] h-[6px] rounded-full mx-1`}
          key={i}
        />
      ))}
    </div>
  );
}

export type SwipeCarouselProps = {
  fullWidth?: boolean;
  withIndicator?: boolean;
  onSlideChange?(i: number): void;
  fullWidthValue?: string;
} & HTMLProps<HTMLDivElement> &
  SwipeableViewsProps &
  any;

/**
 * ### Swipeable content carousel optimised for mobile
 */
export function SwipeCarousel({
  children,
  className = '',
  fullWidth = true,
  withIndicator = true,
  fullWidthValue = '100vw',
  onSlideChange,
  ...props
}: SwipeCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0),
    [carousel, setCarousel] = useState<any>(null),
    [measureRef, { width }] = useMeasure(),
    fullWidthStyle = 'grid !col-span-full w-full',
    [cbReady, setCbReady] = useState(false);

  function updateSlide(i: number) {
    setActiveSlide(i);
    setCbReady(true);
  }

  function tryCb() {
    if (cbReady) {
      onSlideChange && onSlideChange(activeSlide);
    }
    setCbReady(false);
  }

  useEffect(() => {
    carousel?.updateHeight();
  }, [width, carousel]);

  return (
    <div
      ref={measureRef as any}
      className={`${
        fullWidth ? fullWidthStyle : 'flex flex-col items-center'
      } ${className}`}
    >
      <Swipeable
        action={(actions: any) => setCarousel(actions)}
        enableMouseEvents
        className={`${fullWidth && fullWidthStyle}`}
        containerStyle={{
          // Monkeypatch for https://github.com/oliviertassinari/react-swipeable-views/issues/599
          transition: `transform ${
            props.springConfig?.duration || '500ms'
          } ease`,
          ...(fullWidth ? { gridColumn: '1 / -1', width: fullWidthValue } : {})
        }}
        onTransitionEnd={tryCb}
        onChangeIndex={updateSlide}
        {...(props as any)}
      >
        {children}
      </Swipeable>
      {withIndicator && (
        <SwipeIndicator
          className="justify-center col-span-full"
          length={Children.count(children)}
          activeSlide={activeSlide}
        />
      )}
    </div>
  );
}
