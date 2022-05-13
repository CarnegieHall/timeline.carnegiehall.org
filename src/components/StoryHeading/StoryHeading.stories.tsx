import { StoryHeading, StoryHeadingProps } from '.';

export default {
  title: 'Components/StoryHeading',
  component: StoryHeading
};

export const Default = ({
  title = 'African Origins and Adaptations in African American Music',
  position = 1,
  author = { first_name: 'Reebee', last_name: 'Garofalo' }
}: StoryHeadingProps) => (
  <StoryHeading title={title} position={position} author={author} />
);
