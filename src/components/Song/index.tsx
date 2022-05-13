import { ReactComponent as PlayIcon } from '$src/assets/icons/play-solid.svg';
import { ReactComponent as PauseIcon } from '$src/assets/icons/pause-solid.svg';
import { SongConfig, useSong } from '$src/stores/useSong';
import { HTMLProps, useCallback } from 'react';
import { Img } from '../Img';
import shallow from 'zustand/shallow';
import { usePlayer } from '$src/stores/usePlayer';
import { AlbumCover } from '../AlbumCover';

export type SongProps = {
  /** Visual theme of the song */
  theme: 'standard' | 'inline';
  /** Song data */
  song: SongConfig;
  /** Optional label override */
  label?: string | any;
  /** Optional highlight color on hover */
  highlight?: string;
} & HTMLProps<HTMLDivElement>;

/**
 * ### A song with action to play audio on global player
 */
export function Song({
  theme = 'standard',
  song,
  label,
  highlight,
  className = ''
}: SongProps) {
  const [currentSong, setSong] = useSong(
      useCallback((s) => [s.song, s.set], []),
      shallow
    ),
    [playing, setPlayer] = usePlayer(
      useCallback((s) => [s.playing, s.set], []),
      shallow
    ),
    songPlaying = playing && song.title === currentSong?.title,
    Icon = songPlaying ? PauseIcon : PlayIcon,
    parsedLabel =
      typeof label === 'object'
        ? `<${label.type}>${label.props.children}<${label.type}>`
        : label;

  function play() {
    setPlayer({ playing: false });
    setTimeout(() => {
      setSong(song);
      setPlayer({ playing: true });
    }, 0);
  }

  switch (theme) {
    case 'standard':
      return (
        <>
          <style jsx>{`
            .song:hover {
              color: ${highlight};
            }
          `}</style>
          <div
            className={`song cursor-pointer transition-colors group flex ${className}`}
            onClick={play}
          >
            <div className={`relative h-[48px] w-[48px] mr-4`}>
              <div
                className={`absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity z-10`}
                style={{ background: highlight }}
              />
              <AlbumCover song={song} />
            </div>
            <div>
              <span
                className="block font-bold font-display"
                dangerouslySetInnerHTML={{
                  __html: parsedLabel || song?.title || ''
                }}
              />
              <div className="text-sm font-ui">{song?.artist}</div>
            </div>
          </div>
        </>
      );
    case 'inline':
      return (
        <span
          className={`inline overflow-visible cursor-pointer text-red ${className}`}
          onClick={() => {
            if (songPlaying) {
              setPlayer({ playing: false });
            } else {
              play();
            }
          }}
        >
          <Icon
            className="inline p-px w-[1em] h-[1em] mr-[0.2em] fill-[red]"
            style={{ transform: 'translateY(-15%)' }}
          />
          <span
            dangerouslySetInnerHTML={{
              __html: parsedLabel || song?.title || ''
            }}
          />
        </span>
      );
  }
}
