import { MediaScroller } from '.';
import { PageGrid } from '../PageGrid';

export default {
  title: 'Components/MediaScroller',
  component: MediaScroller
};

const DUMMY_DATA = [
  {
    type: 'image',
    media: 'https://assets.imgix.net/unsplash/turntable.jpg',
    caption: 'Conubia cubilia praesent congue sollicitudin',
    credit: 'Image by Carnegie Hall Archives'
  },
  {
    type: 'image',
    media: 'https://assets.imgix.net/unsplash/turntable.jpg',
    caption: 'Dapibus neque placerat curabitur cras',
    credit: 'Image by Carnegie Hall Archives'
  },
  {
    type: 'image',
    media: 'https://assets.imgix.net/unsplash/turntable.jpg',
    caption: 'Parturient gravida tempus lectus semper magnis',
    credit: 'Image by Carnegie Hall Archives'
  },
  {
    type: 'image',
    media: 'https://assets.imgix.net/unsplash/turntable.jpg',
    caption: 'Eget proin hendrerit netus ultrices semper ipsum',
    credit: 'Image by Carnegie Hall Archives'
  }
];

export const Default = () => {
  return (
    <PageGrid>
      <MediaScroller media={DUMMY_DATA as any} />
    </PageGrid>
  );
};
