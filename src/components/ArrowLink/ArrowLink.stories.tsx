import type { LinkProps } from 'next/link';
import { ArrowLink } from '.';

export default {
  title: 'Components/ArrowLink',
  component: ArrowLink
};

export const Default = ({ href = '/' }: LinkProps) => (
  <ArrowLink href={href as any} />
);
