import type { SharedImigixAndSourceProps } from 'react-imgix';
import { Img } from '.';

export default {
  title: 'Components/Img',
  component: Img
};

export const Default = ({
  src = 'https://assets.imgix.net/unsplash/turntable.jpg'
}: SharedImigixAndSourceProps) => <Img src={src} />;
