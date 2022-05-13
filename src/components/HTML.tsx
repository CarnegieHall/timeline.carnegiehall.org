import { parseSong } from '$src/stores/useSong';
import { Children } from 'react';
import Renderer from 'react-html-renderer';
import { Link } from './Link';
import { Song } from './Song';

const SONG_ATTR = 'data-song-json';

export type RichtextProps = {
  /** HTML content to parse */
  content: string;
};

/**
 * ### Renderer for HTML content from a CMS
 */
export function HTML({ content }: RichtextProps) {
  return (
    <Renderer
      html={content}
      components={{
        p: (props) => <p {...props} />,
        h2: (props) => <em {...props} />,
        a: ({ children, href, ...props }: any) => {
          return !!props[SONG_ATTR] ? (
            <Song
              theme="inline"
              song={parseSong(JSON.parse(props[SONG_ATTR]))}
              label={Children.toArray(children)[0]}
              {...props}
            />
          ) : (
            <Link className="anchor" href={href} {...props}>
              {children}
            </Link>
          );
        }
      }}
    />
  );
}
