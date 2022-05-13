import { Img } from '$src/components/Img';
import { usePlayer } from '$src/stores/usePlayer';
import type { SongConfig } from '$src/stores/useSong';
import { useCallback, useEffect, useState } from 'react';
import shallow from 'zustand/shallow';

export function AlbumCover({ song }: { song: SongConfig }) {
  const [musickit, musickitLoading] = usePlayer(
      useCallback((s) => [s.musickit, s.musickitLoading], []),
      shallow
    ),
    [image, setImage] = useState('');

  useEffect(() => {
    async function getImage() {
      if (song?.cover) {
        setImage(song.cover);
        return;
      }

      if (song?.source?.appleId && musickit?.developerToken) {
        const { data } = await fetch(
            `https://api.music.apple.com/v1/catalog/us/songs/${song.source.appleId}`,
            {
              headers: new Headers({
                Authorization: 'Bearer ' + musickit?.developerToken
              })
            }
          ).then((r) => r.json()),
          image = data[0]?.attributes?.artwork.url.replace(/({w}|{h})/gi, '48');
        setImage(image);
      } else {
        setImage('');
      }
    }

    getImage();
  }, [song, musickit?.developerToken]);

  return musickitLoading ? null : (
    <Img
      src={image || ''}
      responsive={!!song?.cover}
      alt={song?.artist || 'Album cover'}
      title={song?.attribution || ''}
      sizes="48px"
      width={48}
      height={48}
      className="object-cover w-full h-full"
      style={{ filter: 'grayscale(1)' }}
      imgixParams={{ fit: 'crop', ar: '1:1' }}
    />
  );
}
