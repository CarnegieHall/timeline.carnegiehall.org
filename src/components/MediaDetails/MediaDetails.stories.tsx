import { MediaDetails, MediaDetailsProps } from '.';

export default {
  title: 'Components/MediaDetails',
  component: MediaDetails
};

export const Default = ({
  credit = 'Video by Carnegie Hall Achives',
  caption = 'Dui tincidunt velit phasellus'
}: MediaDetailsProps) => <MediaDetails credit={credit} caption={caption} />;
