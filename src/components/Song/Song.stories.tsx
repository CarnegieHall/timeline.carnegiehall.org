import { Song, SongProps } from '.';

export default {
  title: 'Components/Song',
  component: Song
};

const SONG = {
  title: 'Dippermouth Blues',
  artist: `Joe "King" Oliver`,
  cover: 'https://assets.imgix.net/unsplash/turntable.jpg',
  audio:
    'https://music-staging.assemble.studio/storage/files/f6aadce4-1b06-4b68-b297-0663d29526a2/02-Dipper-Mouth-Blues.mp3',
  source: {
    type: 'local' as any
  }
};

export const Default = ({ theme = 'standard', song = SONG }: SongProps) => (
  <Song theme={theme} song={song} />
);

export const Inline = ({ theme = 'inline', song = SONG }: SongProps) => (
  <Song theme={theme} song={song} />
);
