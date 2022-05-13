import { Video, VideoProps } from '.';

export default {
  title: 'Components/Video',
  component: Video
};

export const Default = ({
  src = 'https://vimeo.com/374033965',
  thumbnail = 'https://music-staging.assemble.studio/storage/uploads/115a8efe-9f40-4a11-921f-ec3d78eb8a49/latincaribbean-hero.jpg'
}: VideoProps) => <Video src={src} thumbnail={thumbnail} />;
