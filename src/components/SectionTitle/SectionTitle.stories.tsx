import { SectionTitle, SectionTitleProps } from '.';

export default {
  title: 'Components/SectionTitle',
  component: SectionTitle
};

export const Default = ({
  title = 'Definition',
  ...props
}: SectionTitleProps) => <SectionTitle title={title} {...props} />;
