import { SectionDivider, SectionDividerProps } from '.';
import { SectionTitle } from '../SectionTitle';

export default {
  title: 'Components/SectionDivider',
  component: SectionDivider
};

export const Default = () => (
  <SectionDivider>
    <SectionTitle title="Definition" />
  </SectionDivider>
);

export const SingleSide = ({
  dividers = { top: 'standard', bottom: 'none' }
}: SectionDividerProps) => (
  <SectionDivider dividers={dividers}>
    <SectionTitle title="Definition" />
  </SectionDivider>
);

export const DifferentLengths = ({
  dividers = { top: 'long', bottom: 'short' }
}: SectionDividerProps) => (
  <SectionDivider dividers={dividers}>
    <SectionTitle title="Definition" />
  </SectionDivider>
);
