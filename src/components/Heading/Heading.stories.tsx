import { Heading, HeadingProps } from '.';

export default {
  title: 'Components/Heading',
  component: Heading
};

export const Default = (props: HeadingProps) => (
  <Heading {...props} />
);