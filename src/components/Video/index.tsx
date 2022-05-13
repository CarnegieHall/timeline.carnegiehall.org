import { ReactComponent as PlayIcon } from '$src/assets/icons/play.svg';
import type { HTMLProps } from 'react';
import ReactPlayer from 'react-player/lazy';

export type VideoProps = {
  /** Video URL */
  src: string;
  /** Thumbnail image to show before loading full video */
  thumbnail: string;
} & HTMLProps<HTMLDivElement>;

/**
 * ### Video player for Vimeo videos
 */
export function Video({ src, thumbnail, className = '' }: VideoProps) {
  return (
    <div
      className={`aspect-w-16 aspect-h-9 ${className}`}
      style={{
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      <ReactPlayer
        className="absolute top-0 left-0"
        url={src}
        light={thumbnail}
        playing={!!thumbnail}
        preload
        controls
        width="100%"
        height="100%"
        playIcon={
          <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 text-white">
            <PlayIcon className="fill-current h-9 w-9" />
          </div>
        }
        config={{
          vimeo: {
            playerOptions: {
              byline: false,
              title: false
            }
          },
          file: {
            attributes: {
              controls: true,
              poster: thumbnail
            }
          }
        }}
      />
    </div>
  );
}
