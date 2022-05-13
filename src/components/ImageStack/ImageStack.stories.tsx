import { ImageStack, ImageStackProps } from '.';

export default {
  title: 'Components/ImageStack',
  component: ImageStack
};

const DUMMY_DATA = [
  {
    caption: 'Louis Armstrong',
    image:
      'https://music-staging.assemble.studio/storage/uploads/louis-armstrong.jpg'
  },
  {
    caption: 'Sidney Bechet',
    image:
      'https://music-staging.assemble.studio/storage/uploads/sidney-bechet.jpg'
  },
  {
    caption: 'Johnny St. Cyr',
    image:
      'https://music-staging.assemble.studio/storage/uploads/johnny-st-cyr.jpg'
  },
  {
    caption: 'Johnny Dodds',
    image:
      'https://music-staging.assemble.studio/storage/uploads/johnny-dodds.jpg'
  },
  {
    caption: 'Warren “Baby” Dodds',
    image:
      'https://music-staging.assemble.studio/storage/uploads/warren-baby-dodds.jpg'
  },
  {
    caption: 'Honore Dutrey',
    image:
      'https://music-staging.assemble.studio/storage/uploads/666e29f0-2989-43ed-b90f-b92edc3d3019/honore-dutrey.jpg'
  },
  {
    caption: 'Lil Hardin-Armstrong',
    image:
      'https://music-staging.assemble.studio/storage/uploads/lil-hardin-armstrong.jpg'
  },
  {
    caption: 'Lil Hardin-Armstrong',
    image:
      'https://music-staging.assemble.studio/storage/uploads/lil-hardin-armstrong.jpg'
  }
];

export const Default = ({
  images = DUMMY_DATA,
  overlayColour = '#C0D3E5'
}: ImageStackProps) => (
  <ImageStack images={images} overlayColour={overlayColour} />
);

export const LimitedImages = ({
  images = DUMMY_DATA.slice(0, 3),
  overlayColour = '#C0D3E5'
}: ImageStackProps) => (
  <ImageStack images={images} overlayColour={overlayColour} />
);
