import { HTMLProps, useEffect, useRef } from 'react';

export type AudioElementProps = {
  /** Playing state control */
  playing?: boolean;
  /** On Ended callback */
  onEnded?(): void;
} & HTMLProps<HTMLAudioElement>;

/**
 * ### Local audio element wrapper with easier state control
 */
export function AudioElement({
  playing,
  className = '',
  onEnded,
  ...props
}: AudioElementProps) {
  const player = useRef<HTMLAudioElement>(null);

  if (playing) {
    player.current?.play();
  } else {
    player.current?.pause();
  }

  useEffect(() => {
    const el = player.current;
    if (!el) {
      return;
    }

    onEnded && el.addEventListener('ended', onEnded);
    return () => {
      onEnded && el?.removeEventListener('ended', onEnded);
    };
  }, [onEnded]);

  return <audio ref={player as any} className={`${className}`} {...props} />;
}
